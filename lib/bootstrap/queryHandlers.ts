import { MessageBus } from '@arpinum/messaging';

import * as Knex from 'knex';
import { articleQueryHandlers } from '../domain';

interface Dependencies {
  dbClient: Knex;
  queryBus: MessageBus;
}

export function registerQueryHandlers(dependencies: Dependencies) {
  const { dbClient, queryBus } = dependencies;
  const handlers = {
    ...articleQueryHandlers({ dbClient })
  };
  Object.entries(handlers).forEach(([type, handler]) =>
    queryBus.register(type, handler)
  );
}
