import {
    ANNOTATION_LOCATION,
    ANNOTATION_ORIGIN_LOCATION,
    ApiEntity,
    Entity,
} from '@backstage/catalog-model';

import { Config } from '@backstage/config';
import { PluginTaskScheduler, TaskRunner } from '@backstage/backend-tasks';

import {
    EntityProvider,
    EntityProviderConnection,
} from '@backstage/plugin-catalog-node';

import {Logger} from 'winston';
import {readKnativeEventTypeProviderConfigs} from "./config";
import {KnativeEventTypeProviderConfig} from "./types";

export function listServices(
    baseUrl: string
): Promise<any> {
    return fetch(
        `${baseUrl}`,
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        // TODO: no any
        return response.json() as Promise<any>;
    });
}

export class KnativeEventTypeProvider implements EntityProvider {
    private readonly env:string;
    private readonly baseUrl: string;
    private readonly logger:Logger;
    private readonly scheduleFn: () => Promise<void>;
    private connection?: EntityProviderConnection;

    static fromConfig(
        configRoot: Config,
        options: {
            logger: Logger;
            schedule?: TaskRunner;
            scheduler?: PluginTaskScheduler;
        },
    ): KnativeEventTypeProvider[] {
        const providerConfigs = readKnativeEventTypeProviderConfigs(configRoot);

        if (!options.schedule && !options.scheduler) {
            throw new Error('Either schedule or scheduler must be provided.');
        }

        const logger = options.logger.child({ plugin: 'knative-event-type-backend' });
        logger.info(`Found ${providerConfigs.length} knative event type provider configs with ids: ${providerConfigs.map(providerConfig => providerConfig.id).join(', ')}`);

        return providerConfigs.map(providerConfig => {
            if (!options.schedule && !providerConfig.schedule) {
                throw new Error(
                    `No schedule provided neither via code nor config for KnativeEventType entity provider:${providerConfig.id}.`,
                );
            }

            let taskRunner;

            if (options.scheduler && providerConfig.schedule) {
                // Create a scheduled task runner using the provided scheduler and schedule configuration
                taskRunner = options.scheduler.createScheduledTaskRunner(
                    providerConfig.schedule,
                );
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

    constructor(config:KnativeEventTypeProviderConfig, logger:Logger, taskRunner: TaskRunner) {
        this.env = config.id;
        this.baseUrl = config.baseUrl;

        this.logger = logger.child({
            target: this.getProviderName(),
        });

        this.scheduleFn = this.createScheduleFn(taskRunner);
    }

    private createScheduleFn(taskRunner: TaskRunner): () => Promise<void> {
        return async () => {
            const taskId = `${this.getProviderName()}:run`;
            return taskRunner.run({
                id: taskId,
                fn: async () => {
                    try {
                        await this.run();
                    } catch (error: any) {
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
        // TODO
        return `fake-event-type-${this.env}`;
    }

    async connect(connection:EntityProviderConnection):Promise<void> {
        this.connection = connection;
        await this.scheduleFn();
    }

    async run():Promise<void> {
        if (!this.connection) {
            throw new Error('Not initialized');
        }

        // TODO
        const foo = await listServices("http://localhost:8000");

        const entities:Entity[] = [];

        // TODO: this is not needed when we have the real data
        // de-duplicate based on eventType.spec.type
        const eventTypeMap = new Map<string, any>();
        for (const eventType of foo) {
            eventTypeMap.set(eventType.spec.type, eventType);
        }

        /** [5] */
        for (let [_, eventType] of eventTypeMap) {
            const entity = this.buildEventTypeEntity(eventType);
            entities.push(entity);
        }

        /** [6] */
        await this.connection.applyMutation({
            type: 'full',
            entities: entities.map(entity => ({
                entity,
                locationKey: `fake-event-type-provider:${this.env}`,
            })),
        });
    }

    private buildEventTypeEntity(eventType:any):ApiEntity {
        // const location = `url:${this.baseUrl}/apiconfig/services/${service.service.id}`;

        // const spec = JSON.parse(apiDoc.api_doc.body);

        return {
            kind: 'API',
            apiVersion: 'backstage.io/v1alpha1',
            metadata: {
                annotations: {
                    [ANNOTATION_LOCATION]: `url:tbd-kube-api-server`,
                    [ANNOTATION_ORIGIN_LOCATION]: "url:tbd-kube-api-server",
                    // "backstage.io/view-url": "https://console-openshift-console.apps.aliok-c117.serverless.devcluster.openshift.com/k8s/ns/${eventType.metadata.namespace}/eventing.knative.dev~v1beta1~EventType/${eventType.metadata.name}",
                    // "backstage.io/edit-url": "https://console-openshift-console.apps.aliok-c117.serverless.devcluster.openshift.com/k8s/ns/${eventType.metadata.namespace}/eventing.knative.dev~v1beta1~EventType/${eventType.metadata.name}",
                    ...eventType.metadata.annotations
                },
                name: eventType.spec.type,
                // namespace: eventType.metadata.namespace,
                description: eventType.spec.description,
                // title: eventType.spec.type,
                labels: eventType.metadata.labels || {},
                links: [
                    {
                        title: "View in OpenShift Console",
                        icon: "dashboard",
                        url: `https://console-openshift-console.apps.aliok-c117.serverless.devcluster.openshift.com/k8s/ns/${eventType.metadata.namespace}/eventing.knative.dev~v1beta1~EventType/${eventType.metadata.name}`
                    }
                ],
            },
            spec: {
                type: 'eventType',
                lifecycle: this.env,
                system: 'knative-event-mesh',
                owner: 'knative',
                definition: eventType.spec.schemaData || "{}",
            },
            // relations: [
            //     {
            //         type: "apiProvidedBy",
            //         targetRef: `aliok-test:broker:${eventType.spec.reference.namespace}/${eventType.spec.reference.name}`,
            //     }
            // ],
            // status: {
            //     items: [
            //         {
            //
            //         }
            //     ]
            // }
        };
    }
}
