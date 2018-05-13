import { MessageHandler } from '@arpinum/messaging';
import { examples, withTestDb } from '../../../../test';
import { articleQueries } from './articleQueries';
import { ArticleView, findArticlesHandler } from './findArticlesHandler';

describe('Find articles handler', () => {
  const context = withTestDb();
  let handler: MessageHandler<void, Promise<ArticleView[]>>;

  beforeEach(() => {
    handler = findArticlesHandler({ dbClient: context.dbClient });
  });

  afterEach(async () => {
    await context.dbClient.table('articles').truncate();
  });

  it('should return articles from corresponding table', async () => {
    await context.dbClient.table('articles').insert([
      {
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      },
      { id: examples.uuid2, title: 'Game review', text: 'Doom is a great game' }
    ]);

    const articles = await handler(articleQueries.findArticles());

    expect(articles).toEqual([
      {
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      },
      { id: examples.uuid2, title: 'Game review', text: 'Doom is a great game' }
    ]);
  });
});
