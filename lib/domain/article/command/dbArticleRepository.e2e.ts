import { examples, SilentLogger, withTestDb } from '../../../test';
import { Article } from './article';
import { ArticleRepository } from './articleRepository';
import { DbArticleRepository } from './dbArticleRepository';

describe('Db article repository', () => {
  const context = withTestDb();
  let repository: ArticleRepository;

  beforeEach(() => {
    repository = new DbArticleRepository({
      createLogger: () => new SilentLogger(),
      dbClient: context.dbClient
    });
  });

  afterEach(async () => {
    await context.dbClient.table('articles').truncate();
  });

  describe('on get by id', () => {
    it('should get corresponding article', async () => {
      await context.dbClient.table('articles').insert([
        {
          id: examples.uuid,
          title: 'An article',
          text: 'A great article'
        },
        {
          id: examples.uuid2,
          title: 'Another article',
          text: 'Another great article'
        }
      ]);

      const article = await repository.getById(examples.uuid2);

      expect(article).toEqual({
        id: examples.uuid2,
        title: 'Another article',
        text: 'Another great article'
      });
    });

    it('should throw if any error happens in db', async () => {
      const getById = repository.getById(3 as any); // wrong type

      await expect(getById).rejects.toThrow('Article cannot be get by id');
    });
  });

  describe('on save', () => {
    it('should insert article into articles table', async () => {
      await repository.save(
        new Article({
          id: examples.uuid,
          title: 'I have a new cat',
          text: 'Its name is Garfield'
        })
      );

      const articles = await context.dbClient.table('articles');
      expect(articles.length).toEqual(1);
      expect(articles[0]).toEqual({
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      });
    });

    it('should throw if id is already used', async () => {
      await context.dbClient.table('articles').insert({
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      });

      const save = repository.save(
        new Article({
          id: examples.uuid,
          title: 'Hey',
          text: 'This is a great news'
        })
      );

      await expect(save).rejects.toThrow('Article cannot be saved');
    });
  });

  describe('on update', () => {
    it('should update corresponding article', async () => {
      await context.dbClient.table('articles').insert([
        {
          id: examples.uuid,
          title: 'Not me',
          text: 'Not me'
        },
        {
          id: examples.uuid2,
          title: 'Old title',
          text: 'Old text'
        }
      ]);

      await repository.update(
        new Article({
          id: examples.uuid2,
          title: 'New title',
          text: 'New text'
        })
      );

      const articles = await context.dbClient.table('articles');
      expect(articles.length).toEqual(2);
      expect(articles[0]).toEqual({
        id: examples.uuid,
        title: 'Not me',
        text: 'Not me'
      });
      expect(articles[1]).toEqual({
        id: examples.uuid2,
        title: 'New title',
        text: 'New text'
      });
    });

    it('should throw if any error happens in db', async () => {
      await context.dbClient.table('articles').insert({
        id: examples.uuid,
        title: 'Old title',
        text: 'Old text'
      });

      const update = repository.update(
        new Article({
          id: 3 as any, // wrong type
          title: 'New title',
          text: 'New text'
        })
      );

      await expect(update).rejects.toThrow('Article cannot be updated');
    });
  });
});
