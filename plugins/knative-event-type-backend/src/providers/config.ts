import {readTaskScheduleDefinitionFromConfig} from '@backstage/backend-tasks';
import {Config} from '@backstage/config';

import {KnativeEventTypeProviderConfig} from './types';

export function readKnativeEventTypeProviderConfigs(config:Config):KnativeEventTypeProviderConfig[] {
    const providerConfigs = config.getOptionalConfig(
        'catalog.providers.knativeEventType',
    );
    if (!providerConfigs) {
        return [];
    }
    return providerConfigs
        .keys()
        .map(id =>
            readKnativeEventTypeProviderConfig(id, providerConfigs.getConfig(id)),
        );
}

function readKnativeEventTypeProviderConfig(id:string, config:Config):KnativeEventTypeProviderConfig {
    const baseUrl = config.getString('baseUrl');

    const schedule = config.has('schedule')
        ? readTaskScheduleDefinitionFromConfig(config.getConfig('schedule'))
        : undefined;

    return {
        id,
        baseUrl,
        schedule,
    };
}
