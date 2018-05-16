import { MessageHandler } from '@arpinum/messaging';
import * as Knex from 'knex';

import { DbArticle } from '../../command';
import { ArticleView, dbArticleToView } from '../articleViews';

interface Dependencies {
  dbClient: Knex;
}

export function getAllArticlesHandler(
  dependencies: Dependencies
): MessageHandler<void, Promise<ArticleView[]>> {
  const { dbClient } = dependencies;
  return async () => {
    try {
      const dbArticles = (await dbClient.table('articles')) as DbArticle[];
      return dbArticles.map(dbArticleToView);
    } catch (error) {
      throw new Error('Cannot find articles');
    }
  };
}
