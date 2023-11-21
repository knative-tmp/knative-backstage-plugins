import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { KnativeEventTypeProvider } from '@knative-tmp/plugin-knative-event-type-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const knativeEventTypeProvider = new KnativeEventTypeProvider('production', env.logger);
  builder.addEntityProvider(knativeEventTypeProvider);

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();

  await env.scheduler.scheduleTask({
    id: 'run_knative_event_type_refresh',
    fn: async () => {
      await knativeEventTypeProvider.run();
    },
    frequency: { minutes: 30 },
    timeout: { minutes: 10 },
  });

  return router;
}
