import * as Knex from 'knex';

import { ArticleRepository, DbArticleRepository } from '../domain';

interface Dependencies {
  dbClient: Knex;
}

export class Repositories {
  public articleRepository: ArticleRepository;

  constructor(dependencies: Dependencies) {
    const { dbClient } = dependencies;
    this.articleRepository = new DbArticleRepository({ dbClient });
  }
}
