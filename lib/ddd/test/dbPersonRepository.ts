import { Logger, LoggerOptions } from '@arpinum/log';
import * as Knex from 'knex';

import { DbRepository } from '../dbRepository';
import { Person } from './person';
import { PersonRepository } from './personRepository';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
  dbClient: Knex;
}

export class DbPersonRepository extends DbRepository<Person>
  implements PersonRepository {
  constructor(dependencies: Dependencies) {
    super({
      dbClient: dependencies.dbClient,
      logger: dependencies.createLogger({ fileName: __filename }),
      table: 'persons'
    });
  }

  protected fromDbObject(dbObject: any): Person {
    return new Person({
      id: dbObject.id,
      firstName: dbObject.first_name
    });
  }

  protected toDbObject(aggregateRoot: Person): any {
    return {
      id: aggregateRoot.id,
      first_name: aggregateRoot.firstName
    };
  }
}
