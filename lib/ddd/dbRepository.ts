import { Logger } from '@arpinum/log';
import * as Knex from 'knex';

import { AggregateRoot } from './aggregateRoot';
import { Repository } from './repository';

interface Dependencies {
  logger: Logger;
  dbClient: Knex;
  table: string;
}

export abstract class DbRepository<T extends AggregateRoot>
  implements Repository<T> {
  protected dbClient: Knex;
  protected logger: Logger;
  protected table: string;

  protected constructor(dependencies: Dependencies) {
    const { dbClient, logger, table } = dependencies;
    this.dbClient = dbClient;
    this.logger = logger;
    this.table = table;
  }

  public async getById(id: string): Promise<T> {
    try {
      const dbObject = await this.dbClient
        .table(this.table)
        .where({ id })
        .first();
      return this.fromDbObject(dbObject);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Cannot get aggregate root by id');
    }
  }

  public async save(aggregateRoot: T): Promise<void> {
    try {
      const dbObject = this.toDbObject(aggregateRoot);
      await this.dbClient.transaction(trx =>
        trx.table(this.table).insert(dbObject)
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Cannot save aggregate root');
    }
  }

  public async update(aggregateRoot: T): Promise<void> {
    try {
      const dbObject = this.toDbObject(aggregateRoot);
      await this.dbClient.transaction(trx =>
        trx
          .table(this.table)
          .update(dbObject)
          .where({ id: dbObject.id })
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Cannot upgrade aggregate root');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.dbClient.transaction(trx =>
        trx
          .table(this.table)
          .delete()
          .where({ id })
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Cannot delete aggregate root');
    }
  }

  protected abstract fromDbObject(dbObject: any): T;

  protected abstract toDbObject(aggregateRoot: T): any;
}
