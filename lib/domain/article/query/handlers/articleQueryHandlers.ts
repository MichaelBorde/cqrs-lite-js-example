import { CreateLogger } from '@arpinum/log';
import * as Knex from 'knex';

import { articleQueries as queries } from './articleQueries';
import { getAllArticlesHandler } from './getAllArticlesHandler';
import { getArticleByIdHandler } from './getArticleByIdHandler';

interface Dependencies {
  createLogger: CreateLogger;
  dbClient: Knex;
}

export function articleQueryHandlers(dependencies: Dependencies) {
  const { createLogger, dbClient } = dependencies;
  return {
    [queries.getArticleById.toString()]: getArticleByIdHandler({
      createLogger,
      dbClient
    }),
    [queries.getAllArticles.toString()]: getAllArticlesHandler({
      createLogger,
      dbClient
    })
  };
}
