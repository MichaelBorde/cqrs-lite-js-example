import { examples } from '../test';
import {
  AlreadyExistingAggregateRootError,
  MissingAggregateRootError
} from './errors';

describe('MissingAggregateRootError', () => {
  it('could be created', () => {
    const error = new MissingAggregateRootError(examples.uuid);

    expect(error.message).toEqual(
      `Missing aggregate root with id ${examples.uuid}`
    );
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
