import { MessageHandler } from '@arpinum/messaging';
import * as Knex from 'knex';

import { DbArticle } from '../../command';

interface Dependencies {
  dbClient: Knex;
}

export interface ArticleView {
  id: string;
  title: string;
  text: string;
}

export function findArticlesHandler(
  dependencies: Dependencies
): MessageHandler<void, Promise<ArticleView[]>> {
  const { dbClient } = dependencies;
  return async () => {
    const dbArticles = (await dbClient.table('articles')) as DbArticle[];
    return dbArticles.map(fromDbArticle);
  };
}

function fromDbArticle(dbArticle: DbArticle): ArticleView {
  const { id, title, text } = dbArticle;
  return { id, title, text };
}
