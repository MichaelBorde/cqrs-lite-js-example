import { examples, SilentLogger, withTestDb } from '../../../test';
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

  describe('on save', () => {
    it('insert article into articles table', async () => {
      await repository.save({
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      });

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

      const save = repository.save({
        id: examples.uuid,
        title: 'Hey',
        text: 'This is a great news'
      });

      await expect(save).rejects.toThrow(
        `Article with id ${examples.uuid} cannot be saved`
      );
    });
  });
});
