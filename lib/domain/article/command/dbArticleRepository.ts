import * as Knex from 'knex';
import { Article } from './article';
import { ArticleRepository } from './articleRepository';
import { DbArticle } from './dbArticle';

interface Dependencies {
  dbClient: Knex;
}

export class DbArticleRepository implements ArticleRepository {
  private dbClient: Knex;

  constructor(dependencies: Dependencies) {
    const { dbClient } = dependencies;
    this.dbClient = dbClient;
  }

  public async save(article: Article): Promise<void> {
    const dbArticle = toDbArticle(article);
    await this.dbClient.table('articles').insert(dbArticle);
  }
}

function toDbArticle(article: Article): DbArticle {
  return {
    id: article.id,
    title: article.title,
    text: article.text
  };
}
