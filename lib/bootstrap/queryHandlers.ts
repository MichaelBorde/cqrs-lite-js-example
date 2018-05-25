import { MessageBus } from '@arpinum/messaging';

import { Logger, LoggerOptions } from '@arpinum/log';
import * as Knex from 'knex';
import { articleQueryHandlers } from '../domain';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
  dbClient: Knex;
  queryBus: MessageBus;
}

export function registerQueryHandlers(dependencies: Dependencies) {
  const { createLogger, dbClient, queryBus } = dependencies;
  const handlers = {
    ...articleQueryHandlers({ createLogger, dbClient })
  };
  Object.entries(handlers).forEach(([type, handler]) =>
    queryBus.register(type, handler)
  );
}
