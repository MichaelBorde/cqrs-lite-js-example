import { MessageHandler } from '@arpinum/messaging';
import * as Knex from 'knex';

import { DbArticle } from '../../command';
import { ArticleView, dbArticleToView } from '../articleViews';
import { GetArticleByIdPayload } from './articleQueries';

interface Dependencies {
  dbClient: Knex;
}

export function getArticleByIdHandler(
  dependencies: Dependencies
): MessageHandler<GetArticleByIdPayload, Promise<ArticleView>> {
  const { dbClient } = dependencies;
  return async message => {
    const { id } = message.payload;
    const dbArticle = (await dbClient
      .table('articles')
      .where({ id })
      .first()) as DbArticle;
    return dbArticleToView(dbArticle);
  };
}
