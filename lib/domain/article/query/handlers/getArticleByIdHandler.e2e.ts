import { MessageHandler } from '@arpinum/messaging';

import { QuieriedObjectNotFoundError } from '../../../../ddd';
import { examples, SilentLogger, withTestDb } from '../../../../test';
import { ArticleView } from '../articleViews';
import { articleQueries, GetArticleByIdPayload } from './articleQueries';
import { getArticleByIdHandler } from './getArticleByIdHandler';

describe('Get article by id handler', () => {
  const context = withTestDb();
  let handler: MessageHandler<GetArticleByIdPayload, Promise<ArticleView>>;

  beforeEach(() => {
    handler = getArticleByIdHandler({
      createLogger: () => new SilentLogger(),
      dbClient: context.dbClient
    });
  });

  afterEach(async () => {
    await context.dbClient.table('articles').truncate();
  });

  it('should return article with given id', async () => {
    await context.dbClient.table('articles').insert([
      {
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      },
      { id: examples.uuid2, title: 'Game review', text: 'Doom is a great game' }
    ]);

    const article = await handler(
      articleQueries.getArticleById({ id: examples.uuid })
    );

    expect(article).toEqual({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });
  });

  it('should reject if article cannot be found', async () => {
    const query = articleQueries.getArticleById({ id: examples.uuid });

    const handle = handler(query);

    await expect(handle).rejects.toThrow(QuieriedObjectNotFoundError);
  });

  it('should reject if any error happens', async () => {
    const query = articleQueries.getArticleById({ id: 'wrong-type' as any });

    const handle = handler(query);

    await expect(handle).rejects.toThrow(
      `Cannot find article with id wrong-type`
    );
  });
});
