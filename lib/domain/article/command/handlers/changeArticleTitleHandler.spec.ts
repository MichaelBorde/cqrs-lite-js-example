import { MessageHandler } from '@arpinum/messaging';

import { examples } from '../../../../test';
import { ArticleRepositoryMock } from '../../test';
import { Article } from '../article';
import { ArticleRepository } from '../articleRepository';
import { articleCommands, ChangeArticleTitlePayload } from './articleCommands';
import { changeArticleTitleHandler } from './changeArticleTitleHandler';

describe('Change article title hander', () => {
  let articleRepository: ArticleRepository;
  let handler: MessageHandler<ChangeArticleTitlePayload, void>;

  beforeEach(() => {
    articleRepository = new ArticleRepositoryMock();
    handler = changeArticleTitleHandler({ articleRepository });

    articleRepository.getById = jest.fn().mockImplementation((id: string) => {
      if (id === examples.uuid) {
        return Promise.resolve(
          new Article({
            id: examples.uuid,
            title: 'I have a new cat',
            text: 'Its name is Garfield'
          })
        );
      }
      return Promise.resolve(null);
    });
  });

  it('should get corresponding article and update it', async () => {
    const command = articleCommands.changeArticleTitle({
      id: examples.uuid,
      title: 'A new cat'
    });

    await handler(command);

    expect(articleRepository.update).toHaveBeenCalledWith({
      id: examples.uuid,
      title: 'A new cat',
      text: 'Its name is Garfield'
    });
  });

  it('should throw if any error happens', async () => {
    articleRepository.update = jest.fn().mockRejectedValue(new Error('Oupsie'));
    const command = articleCommands.changeArticleTitle({
      id: examples.uuid,
      title: 'A new cat'
    });

    const handle = handler(command);

    await expect(handle).rejects.toThrow("Cannot change article's title");
  });
});
