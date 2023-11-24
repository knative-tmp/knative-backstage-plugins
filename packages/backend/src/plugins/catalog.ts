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

  const knativeEventTypeProviders = KnativeEventTypeProvider.fromConfig(env.config, {
    logger: env.logger,
    scheduler: env.scheduler,
  });
  builder.addEntityProvider(knativeEventTypeProviders);

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();

  return router;
}
