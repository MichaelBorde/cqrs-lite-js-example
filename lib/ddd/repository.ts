import { AggregateRoot } from './aggregateRoot';

export interface Repository<T extends AggregateRoot> {
  save(t: T): Promise<void>;
}
