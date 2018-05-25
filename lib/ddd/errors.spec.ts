import { examples } from '../test';
import {
  AlreadyExistingAggregateRootError,
  MissingAggregateRootError,
  QuieriedObjectNotFoundError
} from './errors';

describe('MissingAggregateRootError', () => {
  it('could be created', () => {
    const error = new MissingAggregateRootError(examples.uuid);

    expect(error.message).toEqual(
      `Missing aggregate root with id ${examples.uuid}`
    );
    expect(error.payload).toEqual({ id: examples.uuid });
    expect(error.name).toEqual('MissingAggregateRootError');
  });
});

describe('AlreadyExistingAggregateRootError', () => {
  it('could be created', () => {
    const error = new AlreadyExistingAggregateRootError(examples.uuid);

    expect(error.message).toEqual(
      `Aggregate root with id ${examples.uuid} already exists`
    );
    expect(error.name).toEqual('AlreadyExistingAggregateRootError');
  });
});

describe('QuieriedObjectNotFoundError', () => {
  it('could be created', () => {
    const error = new QuieriedObjectNotFoundError({ name: 'John' });

    expect(error.message).toEqual(`Quieried object not found`);
    expect(error.payload).toEqual({ name: 'John' });
    expect(error.name).toEqual('QuieriedObjectNotFoundError');
  });
});
