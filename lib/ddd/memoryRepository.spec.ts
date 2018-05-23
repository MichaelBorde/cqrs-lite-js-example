import { examples } from '../test';
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
  });

  describe('on save', () => {
    it('should add aggregate root', async () => {
      const person = new Person({ id: examples.uuid, firstName: 'John' });

      await repository.save(person);

      const roots = Array.from(repository.aggregateRoots.values());
      expect(roots).toEqual([
        new Person({ id: examples.uuid, firstName: 'John' })
      ]);
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

      const roots = Array.from(repository.aggregateRoots.values());
      expect(roots).toEqual([
        new Person({ id: examples.uuid, firstName: 'John' }),
        new Person({ id: examples.uuid2, firstName: 'Billy 2.0' })
      ]);
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

      const roots = Array.from(repository.aggregateRoots.values());
      expect(roots).toEqual([
        new Person({ id: examples.uuid, firstName: 'John' })
      ]);
    });
  });
});
