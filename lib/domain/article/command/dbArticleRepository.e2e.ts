import { examples, withTestDb } from '../../../test';
import { ArticleRepository } from './articleRepository';
import { DbArticleRepository } from './dbArticleRepository';

describe('Db article repository', () => {
  const context = withTestDb();
  let repository: ArticleRepository;

  beforeEach(() => {
    repository = new DbArticleRepository({ dbClient: context.dbClient });
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
  });
});
