import { AggregateRoot } from '../aggregateRoot';

export class Person extends AggregateRoot {
  public firstName: string;

  constructor(rawPerson: { id: string; firstName: string }) {
    super(rawPerson.id);
    const { firstName } = rawPerson;
    this.firstName = firstName;
  }
}
