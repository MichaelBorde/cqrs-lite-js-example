import { Logger, LoggerOptions } from '@arpinum/log';
import { MessageHandler } from '@arpinum/messaging';
import * as Knex from 'knex';

import { DbArticle } from '../../command';
import { ArticleView, dbArticleToView } from '../articleViews';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
  dbClient: Knex;
}

export function getAllArticlesHandler(
  dependencies: Dependencies
): MessageHandler<void, Promise<ArticleView[]>> {
  const { createLogger, dbClient } = dependencies;
  const logger = createLogger({ fileName: __filename });

  return async () => {
    const dbArticles = (await findInDb()) as DbArticle[];
    return dbArticles.map(dbArticleToView);
  };

  function findInDb() {
    return dbClient.table('articles').catch(error => {
      logger.error(error);
      throw new Error('Cannot find articles');
    });
  }
}
