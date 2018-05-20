import * as Knex from 'knex';
import { articleQueries as queries } from './articleQueries';
import { getAllArticlesHandler } from './getAllArticlesHandler';
import { getArticleByIdHandler } from './getArticleByIdHandler';

interface Dependencies {
  dbClient: Knex;
}

export function articleQueryHandlers(dependencies: Dependencies) {
  const { dbClient } = dependencies;
  return {
    [queries.getArticleById.toString()]: getArticleByIdHandler({
      dbClient
    }),
    [queries.getAllArticles.toString()]: getAllArticlesHandler({
      dbClient
    })
  };
}
