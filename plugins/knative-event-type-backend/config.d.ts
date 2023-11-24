import { TaskScheduleDefinitionConfig } from '@backstage/backend-tasks';

export interface Config {
    catalog?: {
        providers?: {
            knativeEventType?: {
                [key: string]: {
                    baseUrl: string;
                    schedule?: TaskScheduleDefinitionConfig;
                };
            };
        };
    };
}
