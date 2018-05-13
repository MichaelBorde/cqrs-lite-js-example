import * as Knex from 'knex';
import { articleQueries } from './articleQueries';
import { findArticlesHandler } from './findArticlesHandler';

interface Dependencies {
  dbClient: Knex;
}

export function articleQueryHandlers(dependencies: Dependencies) {
  const { dbClient } = dependencies;
  return {
    [articleQueries.findArticles.toString()]: findArticlesHandler({ dbClient })
  };
}
