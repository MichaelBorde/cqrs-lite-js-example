import { AggregateRoot } from './aggregateRoot';
import {
  AlreadyExistingAggregateRootError,
  MissingAggregateRootError
} from './errors';
import { Repository } from './repository';

export class MemoryRepository<T extends AggregateRoot>
  implements Repository<T> {
  public aggregateRoots = new Map<string, T>();

  public async getById(id: string): Promise<T> {
    if (!this.aggregateRoots.has(id)) {
      return Promise.reject(new MissingAggregateRootError(id));
    }
    return Promise.resolve(this.aggregateRoots.get(id));
  }

  public async save(aggregateRoot: T): Promise<void> {
    const { id } = aggregateRoot;
    if (this.aggregateRoots.has(id)) {
      return Promise.reject(new AlreadyExistingAggregateRootError(id));
    }
    this.aggregateRoots.set(id, aggregateRoot);
    return Promise.resolve();
  }

  public async update(aggregateRoot: T): Promise<void> {
    const { id } = aggregateRoot;
    if (!this.aggregateRoots.has(id)) {
      return Promise.reject(new MissingAggregateRootError(id));
    }
    this.aggregateRoots.set(id, aggregateRoot);
    return Promise.resolve();
  }

  public async delete(id: string): Promise<void> {
    if (!this.aggregateRoots.has(id)) {
      return Promise.reject(new MissingAggregateRootError(id));
    }
    this.aggregateRoots.delete(id);
    return Promise.resolve();
  }

  public values(): T[] {
    return Array.from(this.aggregateRoots.values());
  }
}
