import { examples, SilentLogger, withTestDb } from '../test';
import { DbPersonRepository, Person, PersonRepository } from './test';

describe('Db repository', () => {
  const context = withTestDb();
  let repository: PersonRepository;

  beforeEach(async () => {
    repository = new DbPersonRepository({
      createLogger: () => new SilentLogger(),
      dbClient: context.dbClient
    });
    await context.dbClient.schema.createTable('persons', table => {
      table.uuid('id').primary();
      table.string('first_name');
    });
  });

  afterEach(async () => {
    await context.dbClient.schema.dropTable('persons');
  });

  describe('on get by id', () => {
    it('should get corresponding aggregate root', async () => {
      await context.dbClient.table('persons').insert([
        {
          id: examples.uuid,
          first_name: 'John'
        },
        {
          id: examples.uuid2,
          first_name: 'Billy'
        }
      ]);

      const root = await repository.getById(examples.uuid2);

      expect(root).toEqual({
        id: examples.uuid2,
        firstName: 'Billy'
      });
    });

    it('should throw if any error happens in db', async () => {
      const getById = repository.getById(3 as any); // wrong type

      await expect(getById).rejects.toThrow('Cannot get aggregate root by id');
    });
  });

  describe('on save', () => {
    it('should insert aggregate root into persons table', async () => {
      await repository.save(
        new Person({
          id: examples.uuid,
          firstName: 'John'
        })
      );

      const roots = await context.dbClient.table('persons');
      expect(roots.length).toEqual(1);
      expect(roots[0]).toEqual({
        id: examples.uuid,
        first_name: 'John'
      });
    });

    it('should throw if id is already used', async () => {
      await context.dbClient.table('persons').insert({
        id: examples.uuid,
        first_name: 'John'
      });

      const save = repository.save(
        new Person({
          id: examples.uuid,
          firstName: 'John'
        })
      );

      await expect(save).rejects.toThrow('Cannot save aggregate root');
    });
  });

  describe('on update', () => {
    it('should update corresponding aggregate root', async () => {
      await context.dbClient.table('persons').insert([
        {
          id: examples.uuid,
          first_name: 'Not me'
        },
        {
          id: examples.uuid2,
          first_name: 'Old first name'
        }
      ]);

      await repository.update(
        new Person({
          id: examples.uuid2,
          firstName: 'New first name'
        })
      );

      const persons = await context.dbClient.table('persons');
      expect(persons.length).toEqual(2);
      expect(persons[0]).toEqual({
        id: examples.uuid,
        first_name: 'Not me'
      });
      expect(persons[1]).toEqual({
        id: examples.uuid2,
        first_name: 'New first name'
      });
    });

    it('should throw if any error happens in db', async () => {
      await context.dbClient.table('persons').insert({
        id: examples.uuid,
        first_name: 'Old first name'
      });

      const update = repository.update(
        new Person({
          id: 3 as any, // wrong type
          firstName: 'New first name'
        })
      );

      await expect(update).rejects.toThrow('Cannot upgrade aggregate root');
    });
  });

  describe('on delete', () => {
    it('should delete corresponding aggregate root', async () => {
      await context.dbClient.table('persons').insert([
        {
          id: examples.uuid,
          first_name: 'Not me'
        },
        {
          id: examples.uuid2,
          first_name: 'Me'
        }
      ]);

      await repository.delete(examples.uuid2);

      const persons = await context.dbClient.table('persons');
      expect(persons.length).toEqual(1);
      expect(persons[0]).toEqual({
        id: examples.uuid,
        first_name: 'Not me'
      });
    });

    it('should throw if any error happens in db', async () => {
      const deletion = repository.delete(3 as any); // wrong type

      await expect(deletion).rejects.toThrow('Cannot delete aggregate root');
    });
  });
});
