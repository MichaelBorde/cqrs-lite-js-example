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
        }
      ]);

      const article = await repository.getById(examples.uuid);

      expect(article).toEqual({
        id: examples.uuid,
        title: 'An article',
        text: 'A great article'
      });
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
  });

  describe('on update', () => {
    it('should update corresponding article', async () => {
      await context.dbClient.table('articles').insert([
        {
          id: examples.uuid,
          title: 'Old title',
          text: 'Old text'
        }
      ]);

      await repository.update(
        new Article({
          id: examples.uuid,
          title: 'New title',
          text: 'New text'
        })
      );

      const articles = await context.dbClient.table('articles');
      expect(articles.length).toEqual(1);
      expect(articles[0]).toEqual({
        id: examples.uuid,
        title: 'New title',
        text: 'New text'
      });
    });
  });
});
