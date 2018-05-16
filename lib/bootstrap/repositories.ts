import { Logger, LoggerOptions } from '@arpinum/log';
import * as Knex from 'knex';

import { ArticleRepository, DbArticleRepository } from '../domain';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
  dbClient: Knex;
}

export class Repositories {
  public articleRepository: ArticleRepository;

  constructor(dependencies: Dependencies) {
    const { createLogger, dbClient } = dependencies;
    this.articleRepository = new DbArticleRepository({
      createLogger,
      dbClient
    });
  }
}
