import {
  createLogger as rawCreateLogger,
  Logger,
  LoggerOptions
} from '@arpinum/log';
import { createMessageBus, MessageBus } from '@arpinum/messaging';
import * as Knex from 'knex';

import { Configuration, loadConfiguration } from '../configuration';
import { registerCommandHandlers } from './commandHandlers';
import { registerQueryHandlers } from './queryHandlers';
import { Repositories } from './repositories';

export interface RuntimeDependencies {
  configuration: Configuration;
  createLogger: (options: LoggerOptions) => Logger;
  commandBus: MessageBus;
  queryBus: MessageBus;
}

export function bootstrap(): RuntimeDependencies {
  const configuration = loadConfiguration();
  const createLogger = createCreateLogger();
  const commandBus = createCommandBus();
  const queryBus = createQueryBus();
  const dbClient = createDbClient();
  const repositories = new Repositories({ dbClient });
  registerCommandHandlers({ repositories, commandBus });
  registerQueryHandlers({ queryBus, dbClient });

  return {
    configuration,
    createLogger,
    queryBus,
    commandBus
  };

  function createCreateLogger() {
    return (options: LoggerOptions) =>
      rawCreateLogger(
        Object.assign({ logLevel: configuration.logLevel }, options)
      );
  }

  function createCommandBus(): MessageBus {
    const commandBusLogger = createLogger({
      level: configuration.logLevel,
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
      level: configuration.logLevel,
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
