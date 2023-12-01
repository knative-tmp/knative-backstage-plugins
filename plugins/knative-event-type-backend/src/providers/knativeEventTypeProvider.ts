import {PluginTaskScheduler, TaskRunner} from '@backstage/backend-tasks';
import {
    ApiEntity,
    Entity,
    ANNOTATION_LOCATION,
    ANNOTATION_ORIGIN_LOCATION,
    EntityLink,
} from '@backstage/catalog-model';

import {Config} from '@backstage/config';

import {EntityProvider, EntityProviderConnection,} from '@backstage/plugin-catalog-node';

import {Logger} from 'winston';
import {readKnativeEventTypeProviderConfigs} from "./config";
import {KnativeEventTypeProviderConfig} from "./types";

type EventType = {
    name:string;
    namespace:string;
    type:string;
    uid:string;
    description?:string;
    schemaData?:string;
    schemaURL?:string;
    labels?:Record<string, string>;
    annotations?:Record<string, string>;
    provider?:{
        name:string;
        namespace:string;
        kind:string;
    },
};

export async function listEventTypes(baseUrl:string):Promise<EventType[]> {
    const response = await fetch(`${baseUrl}/eventtypes`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json() as Promise<EventType[]>;
}

export class KnativeEventTypeProvider implements EntityProvider {
    private readonly env:string;
    private readonly baseUrl:string;
    private readonly logger:Logger;
    private readonly scheduleFn:() => Promise<void>;
    private connection?:EntityProviderConnection;

    static fromConfig(
        configRoot:Config,
        options:{
            logger:Logger;
            schedule?:TaskRunner;
            scheduler?:PluginTaskScheduler;
        },
    ):KnativeEventTypeProvider[] {
        const providerConfigs = readKnativeEventTypeProviderConfigs(configRoot);

        if (!options.schedule && !options.scheduler) {
            throw new Error('Either schedule or scheduler must be provided.');
        }

        const logger = options.logger.child({plugin: 'knative-event-type-backend'});
        logger.info(`Found ${providerConfigs.length} knative event type provider configs with ids: ${providerConfigs.map(providerConfig => providerConfig.id).join(', ')}`);

        return providerConfigs.map(providerConfig => {
            if (!options.schedule && !providerConfig.schedule) {
                throw new Error(`No schedule provided neither via code nor config for KnativeEventType entity provider:${providerConfig.id}.`);
            }

            let taskRunner;

            if (options.scheduler && providerConfig.schedule) {
                // Create a scheduled task runner using the provided scheduler and schedule configuration
                taskRunner = options.scheduler.createScheduledTaskRunner(providerConfig.schedule);
            } else if (options.schedule) {
                // Use the provided schedule directly
                taskRunner = options.schedule;
            } else {
                // Handle the case where both options.schedule and options.scheduler are missing
                throw new Error('Neither schedule nor scheduler is provided.');
            }

            return new KnativeEventTypeProvider(
                providerConfig,
                options.logger,
                taskRunner,
            );
        });
    }

    constructor(config:KnativeEventTypeProviderConfig, logger:Logger, taskRunner:TaskRunner) {
        this.env = config.id;
        this.baseUrl = config.baseUrl;

        this.logger = logger.child({
            target: this.getProviderName(),
        });

        this.scheduleFn = this.createScheduleFn(taskRunner);
    }

    private createScheduleFn(taskRunner:TaskRunner):() => Promise<void> {
        return async () => {
            const taskId = `${this.getProviderName()}:run`;
            return taskRunner.run({
                id: taskId,
                fn: async () => {
                    try {
                        await this.run();
                    } catch (error:any) {
                        // Ensure that we don't log any sensitive internal data:
                        this.logger.error(
                            `Error while fetching Knative EventTypes from ${this.baseUrl}`,
                            {
                                // Default Error properties:
                                name: error.name,
                                message: error.message,
                                stack: error.stack,
                                // Additional status code if available:
                                status: error.response?.status,
                            },
                        );
                    }
                },
            });
        };
    }

    getProviderName():string {
        return `knative-event-type-${this.env}`;
    }

    async connect(connection:EntityProviderConnection):Promise<void> {
        this.connection = connection;
        await this.scheduleFn();
    }

    async run():Promise<void> {
        if (!this.connection) {
            throw new Error('Not initialized');
        }

        const eventTypes = await listEventTypes(this.baseUrl);

        const entities:Entity[] = [];

        // TODO: deduplication still necessary?
        // const eventTypeMap = new Map<string, any>();
        // for (const eventType of eventTypes) {
        //     // TODO: namespace
        //     eventTypeMap.set(eventType.type, eventType);
        // }

        for (const eventType of eventTypes) {
            const entity = this.buildEventTypeEntity(eventType);
            entities.push(entity);
        }

        await this.connection.applyMutation({
            type: 'full',
            entities: entities.map(entity => ({
                entity,
                locationKey: this.getProviderName(),
            })),
        });
    }

    private buildEventTypeEntity(eventType:EventType):ApiEntity {
        const annotations = eventType.annotations ?? {} as Record<string, string>;
        // TODO: no route exists yet
        annotations[ANNOTATION_ORIGIN_LOCATION] = annotations[ANNOTATION_LOCATION] = `url:${this.baseUrl}/eventtype/${eventType.namespace}/${eventType.name}`;

        const links:EntityLink[] = [];
        if (eventType.schemaURL) {
            links.push({
                title: "View external schema",
                icon: "scaffolder",
                url: eventType.schemaURL
            });
        }

        // TODO: remove?
        // let relations:EntityRelation[] = [];
        // if (eventType.provider) {
        //     relations = [...relations, {
        //         // type: RELATION_API_PROVIDED_BY,
        //         type: 'apiProvidedBy',
        //         // TODO: ref should point to the Backstage Broker provider
        //         // targetRef: `${this.getProviderName()}:${eventType.provider.kind}:${eventType.provider.namespace}/${eventType.provider.name}`,
        //         targetRef: `component:default/example-website`,
        //     }];
        //     console.log(relations);
        //
        //     // TODO:
        //     // partOf: https://backstage.io/docs/features/software-catalog/well-known-relations/#partof-and-haspart
        //     // - system?
        //
        //     // TODO:
        //     // apiConsumedBy: https://backstage.io/docs/features/software-catalog/well-known-relations/#consumesapi-and-apiconsumedby
        //     // - triggers?
        // }

        return {
            apiVersion: 'backstage.io/v1alpha1',
            kind: 'API',
            metadata: {
                name: eventType.name,
                namespace: eventType.namespace,
                title: eventType.type,
                description: eventType.description,
                // TODO: is there a value showing Kubernetes labels in Backstage?
                labels: eventType.labels || {} as Record<string, string>,
                // TODO: is there a value showing Kubernetes annotations in Backstage?
                annotations: annotations,
                // we don't use tags
                tags: [],
                links: links,
            },
            spec: {
                type: 'eventType',
                lifecycle: this.env,
                // TODO
                system: 'knative-event-mesh',
                // TODO
                owner: 'knative',
                definition: eventType.schemaData || "{}",
            },
            // TODO: remove?
            // Backstage doesn't like empty relations
            // relations: relations.length > 0 ? relations : undefined,
        };
    }
}
