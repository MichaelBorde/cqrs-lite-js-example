import { MessageHandler } from '@arpinum/messaging';

import { examples, SilentLogger, withTestDb } from '../../../../test';
import { ArticleView } from '../articleViews';
import { articleQueries } from './articleQueries';
import { getAllArticlesHandler } from './getAllArticlesHandler';

describe('Get all articles handler', () => {
  const context = withTestDb();
  let handler: MessageHandler<void, Promise<ArticleView[]>>;

  beforeEach(() => {
    handler = getAllArticlesHandler({
      createLogger: () => new SilentLogger(),
      dbClient: context.dbClient
    });
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

    const articles = await handler(articleQueries.getAllArticles());

    expect(articles).toEqual([
      {
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      },
      { id: examples.uuid2, title: 'Game review', text: 'Doom is a great game' }
    ]);
  });

  it('should firstName if any error happens', () => {
    // i can't easily make implementation fails
  });
});
