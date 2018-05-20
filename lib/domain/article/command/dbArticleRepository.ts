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

  public async getById(id: string): Promise<Article> {
    try {
      const dbArticle = (await this.dbClient
        .table('articles')
        .where({ id })
        .first()) as DbArticle;
      return fromDbArticle(dbArticle);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Article cannot be get by id');
    }
  }

  public async save(article: Article): Promise<void> {
    try {
      const dbArticle = toDbArticle(article);
      await this.dbClient.transaction(trx =>
        trx.table('articles').insert(dbArticle)
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Article cannot be saved');
    }
  }

  public async update(article: Article): Promise<void> {
    try {
      const dbArticle = toDbArticle(article);
      await this.dbClient.transaction(trx =>
        trx
          .table('articles')
          .update(dbArticle)
          .where({ id: dbArticle.id })
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Article cannot be updated');
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

function fromDbArticle(dbArticle: DbArticle): Article {
  return new Article({
    id: dbArticle.id,
    title: dbArticle.title,
    text: dbArticle.text
  });
}
