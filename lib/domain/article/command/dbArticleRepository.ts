import { CreateLogger } from '@arpinum/log';
import * as Knex from 'knex';

import { DbRepository } from '../../../ddd/dbRepository';
import { Article } from './article';
import { ArticleRepository } from './articleRepository';

interface Dependencies {
  createLogger: CreateLogger;
  dbClient: Knex;
}

export class DbArticleRepository extends DbRepository<Article>
  implements ArticleRepository {
  constructor(dependencies: Dependencies) {
    super({
      dbClient: dependencies.dbClient,
      logger: dependencies.createLogger({ fileName: __filename }),
      table: 'articles'
    });
  }

  protected fromDbObject(dbObject: any): Article {
    return new Article({
      id: dbObject.id,
      title: dbObject.title,
      text: dbObject.text
    });
  }

  protected toDbObject(aggregateRoot: Article): any {
    return {
      id: aggregateRoot.id,
      title: aggregateRoot.title,
      text: aggregateRoot.text
    };
  }
}
