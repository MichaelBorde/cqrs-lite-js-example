import { AggregateRoot } from './aggregateRoot';
import { Repository } from './repository';

export class MemoryRepository<T extends AggregateRoot>
  implements Repository<T> {
  public aggregateRoots = new Map<string, T>();

  public async getById(id: string): Promise<T> {
    return Promise.resolve(this.aggregateRoots.get(id));
  }

  public async save(aggregateRoot: T): Promise<void> {
    this.aggregateRoots.set(aggregateRoot.id, aggregateRoot);
    return Promise.resolve();
  }

  public async update(aggregateRoot: T): Promise<void> {
    this.aggregateRoots.set(aggregateRoot.id, aggregateRoot);
    return Promise.resolve();
  }

  public async delete(id: string): Promise<void> {
    this.aggregateRoots.delete(id);
    return Promise.resolve();
  }
}
