import {
  CreateLogger,
  createLogger as rawCreateLogger,
  LevelName,
  LoggerOptions
} from '@arpinum/log';
import { createMessageBus, MessageBus } from '@arpinum/messaging';
import * as Knex from 'knex';

import { Configuration } from '../configuration';
import { registerCommandHandlers } from './commandHandlers';
import { registerQueryHandlers } from './queryHandlers';
import { Repositories } from './repositories';

export interface RuntimeDependencies {
  createLogger: CreateLogger;
  commandBus: MessageBus;
  queryBus: MessageBus;
}

interface Dependencies {
  configuration: Configuration;
}

export function bootstrap(dependencies: Dependencies): RuntimeDependencies {
  const { configuration } = dependencies;
  const createLogger = createCreateLogger();
  const commandBus = createCommandBus();
  const queryBus = createQueryBus();
  const dbClient = createDbClient();
  const repositories = new Repositories({ createLogger, dbClient });
  registerCommandHandlers({ repositories, commandBus });
  registerQueryHandlers({ createLogger, queryBus, dbClient });

  return {
    createLogger,
    queryBus,
    commandBus
  };

  function createCreateLogger() {
    return (options: LoggerOptions = {}) =>
      rawCreateLogger(
        Object.assign({ logLevel: configuration.logLevel }, options)
      );
  }

  function createCommandBus(): MessageBus {
    const commandBusLogger = createLogger({
      level: configuration.logLevel as LevelName,
      category: 'CommandBus'
    });
    return createMessageBus({
      log: m => commandBusLogger.debug(m),
      exclusiveHandlers: true,
      ensureAtLeastOneHandler: true
    });
  }

  function createQueryBus(): MessageBus {
    const queryBusLogger = createLogger({
      level: configuration.logLevel as LevelName,
      category: 'QueryBus'
    });
    return createMessageBus({
      log: m => queryBusLogger.debug(m),
      exclusiveHandlers: true,
      ensureAtLeastOneHandler: true
    });
  }

  function createDbClient(): Knex {
    return Knex({
      client: 'pg',
      connection: configuration.database.url
    });
  }
}
