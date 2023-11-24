import {TaskScheduleDefinition} from '@backstage/backend-tasks';

export type KnativeEventTypeProviderConfig = {
    id:string;
    baseUrl:string;
    schedule?:TaskScheduleDefinition;
};
