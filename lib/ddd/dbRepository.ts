import { Logger } from '@arpinum/log';
import * as Knex from 'knex';

import { AggregateRoot } from './aggregateRoot';
import {
  AlreadyExistingAggregateRootError,
  MissingAggregateRootError
} from './errors';
import { Repository } from './repository';

interface Dependencies {
  logger: Logger;
  dbClient: Knex;
  table: string;
}

const duplicateKeyCode = '23505';

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
    const dbObject = await this.findInDb(id);
    if (dbObject === undefined) {
      throw new MissingAggregateRootError(id);
    }
    return this.fromDbObject(dbObject);
  }

  private findInDb(id: string) {
    return this.dbClient
      .table(this.table)
      .where({ id })
      .first()
      .catch(error => {
        this.logger.error(error);
        throw new Error('Cannot get aggregate root by id');
      });
  }

  public async save(aggregateRoot: T): Promise<void> {
    try {
      const dbObject = this.toDbObject(aggregateRoot);
      await this.dbClient.transaction(trx =>
        trx.table(this.table).insert(dbObject)
      );
    } catch (error) {
      if (error.code === duplicateKeyCode) {
        throw new AlreadyExistingAggregateRootError(aggregateRoot.id);
      } else {
        this.logger.error(error);
        throw new Error('Cannot save aggregate root');
      }
    }
  }

  public async update(aggregateRoot: T): Promise<void> {
    const { id } = aggregateRoot;
    const dbObject = this.toDbObject(aggregateRoot);
    const updates = await this.updateInDb(dbObject);
    if (updates === 0) {
      throw new MissingAggregateRootError(id);
    }
  }

  private updateInDb(dbObject: any) {
    return this.dbClient
      .transaction(trx =>
        trx
          .table(this.table)
          .update(dbObject)
          .where({ id: dbObject.id })
      )
      .catch(error => {
        this.logger.error(error);
        throw new Error('Cannot upgrade aggregate root');
      });
  }

  public async delete(id: string): Promise<void> {
    const deletions = await this.deleteInDb(id);
    if (deletions === 0) {
      throw new MissingAggregateRootError(id);
    }
  }

  private deleteInDb(id: string) {
    return this.dbClient
      .transaction(trx =>
        trx
          .table(this.table)
          .delete()
          .where({ id })
      )
      .catch(error => {
        this.logger.error(error);
        throw new Error('Cannot delete aggregate root');
      });
  }

  protected abstract fromDbObject(dbObject: any): T;

  protected abstract toDbObject(aggregateRoot: T): any;
}
