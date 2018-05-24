import { MessageHandler } from '@arpinum/messaging';

import { examples } from '../../../../test';
import { MemoryArticleRepository } from '../../test';
import { articleCommands, CreateArticlePayload } from './articleCommands';
import { createArticleHandler } from './createArticleHandler';

describe('Create article hander', () => {
  let articleRepository: MemoryArticleRepository;
  let handler: MessageHandler<CreateArticlePayload, void>;

  beforeEach(() => {
    articleRepository = new MemoryArticleRepository();
    handler = createArticleHandler({ articleRepository });
  });

  it('should create an article and save it', async () => {
    const command = articleCommands.createArticle({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });

    await handler(command);

    expect(articleRepository.values()).toEqual([
      {
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      }
    ]);
  });
});
