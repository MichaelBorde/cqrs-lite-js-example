import * as Knex from 'knex';
import { articleQueries } from './articleQueries';
import { getAllArticlesHandler } from './getAllArticlesHandler';
import { getArticleByIdHandler } from './getArticleByIdHandler';

interface Dependencies {
  dbClient: Knex;
}

export function articleQueryHandlers(dependencies: Dependencies) {
  const { dbClient } = dependencies;
  return {
    [articleQueries.getArticleById.toString()]: getArticleByIdHandler({
      dbClient
    }),
    [articleQueries.getAllArticles.toString()]: getAllArticlesHandler({
      dbClient
    })
  };
}
