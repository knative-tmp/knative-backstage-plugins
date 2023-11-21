import {EventTypes} from './fake-data';

import {
    ANNOTATION_LOCATION,
    ANNOTATION_ORIGIN_LOCATION,
    ApiEntity,
    Entity,
} from '@backstage/catalog-model';

import {
    EntityProvider,
    EntityProviderConnection,
} from '@backstage/plugin-catalog-node';

import {Logger} from 'winston';

export class KnativeEventTypeProvider implements EntityProvider {
    private readonly env:string;
    // @ts-ignore
    private readonly logger:Logger;
    private connection?:EntityProviderConnection;

    /** [1] */
    constructor(env:string, logger:Logger) {
        this.env = env;
        this.logger = logger;
    }

    /** [2] */
    getProviderName():string {
        return `fake-event-type-${this.env}`;
    }

    /** [3] */
    async connect(connection:EntityProviderConnection):Promise<void> {
        this.connection = connection;
    }

    /** [4] */
    async run():Promise<void> {
        if (!this.connection) {
            throw new Error('Not initialized');
        }

        const entities:Entity[] = [];

        // de-duplicate based on eventType.spec.type
        const eventTypeMap = new Map<string, any>();
        for (const eventType of EventTypes.items) {
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
