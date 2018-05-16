import { MessageHandler } from '@arpinum/messaging';

import { examples } from '../../../../test';
import { ArticleRepositoryMock } from '../../test';
import { ArticleRepository } from '../articleRepository';
import { articleCommands, ArticleCreation } from './articleCommands';
import { createArticleHandler } from './createArticleHandler';

describe('Create article hander', () => {
  let articleRepository: ArticleRepository;
  let handler: MessageHandler<ArticleCreation, void>;

  beforeEach(() => {
    articleRepository = new ArticleRepositoryMock();
    handler = createArticleHandler({ articleRepository });
  });

  it('should create an article and save it', async () => {
    const command = articleCommands.createArticle({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });

    await handler(command);

    expect(articleRepository.save).toHaveBeenCalledWith({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });
  });

  it('should throw if any error happens', async () => {
    articleRepository.save = jest.fn().mockRejectedValue(new Error('Oupsie'));
    const command = articleCommands.createArticle({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });

    const handle = handler(command);

    await expect(handle).rejects.toThrow('Cannot create article');
  });
});
