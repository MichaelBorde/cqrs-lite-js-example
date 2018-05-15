import { MessageHandler } from '@arpinum/messaging';

import { examples, withTestDb } from '../../../../test';
import { ArticleView } from '../articleViews';
import { articleQueries, GetArticleByIdPayload } from './articleQueries';
import { getArticleByIdHandler } from './getArticleByIdHandler';

describe('Get article by id handler', () => {
  const context = withTestDb();
  let handler: MessageHandler<GetArticleByIdPayload, Promise<ArticleView>>;

  beforeEach(() => {
    handler = getArticleByIdHandler({ dbClient: context.dbClient });
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
});
