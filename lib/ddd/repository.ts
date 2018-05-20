import { AggregateRoot } from './aggregateRoot';

export interface Repository<T extends AggregateRoot> {
  getById(id: string): Promise<T>;

  save(t: T): Promise<void>;

  update(t: T): Promise<void>;
}
