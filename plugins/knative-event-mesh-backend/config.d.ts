import { TaskScheduleDefinitionConfig } from '@backstage/backend-tasks';

export interface Config {
    catalog?: {
        providers?: {
            knativeEventMesh?: {
                [key: string]: {
                    baseUrl: string;
                    schedule?: TaskScheduleDefinitionConfig;
                };
            };
        };
    };
}
