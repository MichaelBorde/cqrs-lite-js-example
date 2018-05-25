import { Logger, LoggerOptions } from '@arpinum/log';
import { MessageHandler } from '@arpinum/messaging';
import * as Knex from 'knex';

import { QuieriedObjectNotFoundError } from '../../../../ddd';
import { DbArticle } from '../../command';
import { ArticleView, dbArticleToView } from '../articleViews';
import { GetArticleByIdPayload } from './articleQueries';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
  dbClient: Knex;
}

export function getArticleByIdHandler(
  dependencies: Dependencies
): MessageHandler<GetArticleByIdPayload, Promise<ArticleView>> {
  const { createLogger, dbClient } = dependencies;
  const logger = createLogger({ fileName: __filename });

  return async message => {
    const { id } = message.payload;
    const dbArticle = (await findInDb(id)) as DbArticle;
    if (dbArticle === undefined) {
      throw new QuieriedObjectNotFoundError({ id });
    }
    return dbArticleToView(dbArticle);
  };

  function findInDb(id: string) {
    return dbClient
      .table('articles')
      .where({ id })
      .first()
      .catch(error => {
        logger.error(error);
        throw new Error(`Cannot find article with id ${id}`);
      });
  }
}
