import { examples } from '../test';
import {
  AlreadyExistingAggregateRootError,
  MissingAggregateRootError
} from './errors';
import { MemoryRepository } from './memoryRepository';
import { Person } from './test';

describe('Memory repository', () => {
  let repository: MemoryRepository<Person>;

  beforeEach(() => {
    repository = new MemoryRepository<Person>();
  });

  describe('on get by id', () => {
    it('should return the corresponding aggregate root', async () => {
      repository.aggregateRoots.set(
        examples.uuid,
        new Person({ id: examples.uuid, firstName: 'John' })
      );
      repository.aggregateRoots.set(
        examples.uuid2,
        new Person({ id: examples.uuid2, firstName: 'Billy' })
      );

      const person = await repository.getById(examples.uuid2);

      expect(person).toEqual(
        new Person({ id: examples.uuid2, firstName: 'Billy' })
      );
    });

    it('should reject when root does not exist', async () => {
      const getById = repository.getById(examples.uuid);

      await expect(getById).rejects.toThrow(MissingAggregateRootError);
    });
  });

  describe('on save', () => {
    it('should add aggregate root', async () => {
      const person = new Person({ id: examples.uuid, firstName: 'John' });

      await repository.save(person);

      expect(repository.values()).toEqual([
        new Person({ id: examples.uuid, firstName: 'John' })
      ]);
    });

    it('should reject when root already exists', async () => {
      repository.aggregateRoots.set(
        examples.uuid,
        new Person({ id: examples.uuid, firstName: 'John' })
      );
      const person = new Person({ id: examples.uuid, firstName: 'Billy' });

      const save = repository.save(person);

      await expect(save).rejects.toThrow(AlreadyExistingAggregateRootError);
    });
  });

  describe('on update', () => {
    it('should update aggregate root', async () => {
      repository.aggregateRoots.set(
        examples.uuid,
        new Person({ id: examples.uuid, firstName: 'John' })
      );
      repository.aggregateRoots.set(
        examples.uuid2,
        new Person({ id: examples.uuid2, firstName: 'Billy' })
      );

      await repository.update(
        new Person({ id: examples.uuid2, firstName: 'Billy 2.0' })
      );

      expect(repository.values()).toEqual([
        new Person({ id: examples.uuid, firstName: 'John' }),
        new Person({ id: examples.uuid2, firstName: 'Billy 2.0' })
      ]);
    });

    it('should reject when root does not exist', async () => {
      const person = new Person({ id: examples.uuid, firstName: 'John' });

      const update = repository.update(person);

      await expect(update).rejects.toThrow(MissingAggregateRootError);
    });
  });

  describe('on delete', () => {
    it('should remove aggregate root', async () => {
      repository.aggregateRoots.set(
        examples.uuid,
        new Person({ id: examples.uuid, firstName: 'John' })
      );
      repository.aggregateRoots.set(
        examples.uuid2,
        new Person({ id: examples.uuid2, firstName: 'Billy' })
      );

      await repository.delete(examples.uuid2);

      expect(repository.values()).toEqual([
        new Person({ id: examples.uuid, firstName: 'John' })
      ]);
    });

    it('should reject when root does not exist', async () => {
      const deletion = repository.delete(examples.uuid);

      await expect(deletion).rejects.toThrow(MissingAggregateRootError);
    });
  });
});
