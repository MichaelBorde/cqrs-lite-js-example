import { MessageHandler } from '@arpinum/messaging';

import { examples } from '../../../../test';
import { MemoryArticleRepository } from '../../test';
import { Article } from '../article';
import { articleCommands, ChangeArticleTitlePayload } from './articleCommands';
import { changeArticleTitleHandler } from './changeArticleTitleHandler';

describe('Change article title hander', () => {
  let articleRepository: MemoryArticleRepository;
  let handler: MessageHandler<ChangeArticleTitlePayload, void>;

  beforeEach(async () => {
    articleRepository = new MemoryArticleRepository();
    handler = changeArticleTitleHandler({ articleRepository });

    await articleRepository.save(
      new Article({
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      })
    );
  });

  it('should get corresponding article and update it', async () => {
    const command = articleCommands.changeArticleTitle({
      id: examples.uuid,
      title: 'A new cat'
    });

    await handler(command);

    expect(articleRepository.values()).toEqual([
      {
        id: examples.uuid,
        title: 'A new cat',
        text: 'Its name is Garfield'
      }
    ]);
  });
});
