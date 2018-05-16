import { Logger, LoggerOptions } from '@arpinum/log';
import * as Knex from 'knex';

import { Article } from './article';
import { ArticleRepository } from './articleRepository';
import { DbArticle } from './dbArticle';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
  dbClient: Knex;
}

export class DbArticleRepository implements ArticleRepository {
  private dbClient: Knex;
  private logger: Logger;

  constructor(dependencies: Dependencies) {
    const { createLogger, dbClient } = dependencies;
    this.dbClient = dbClient;
    this.logger = createLogger({ fileName: __filename });
  }

  public async save(article: Article): Promise<void> {
    try {
      const dbArticle = toDbArticle(article);
      await this.dbClient.transaction(trx =>
        trx.table('articles').insert(dbArticle)
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Article with id ${article.id} cannot be saved`);
    }
  }
}

function toDbArticle(article: Article): DbArticle {
  return {
    id: article.id,
    title: article.title,
    text: article.text
  };
}
