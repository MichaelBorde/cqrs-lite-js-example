import { MessageHandler } from '@arpinum/messaging';

import { examples } from '../../../../test';
import { ArticleRepository } from '../articleRepository';
import { articleCommands, ArticleCreation } from './articleCommands';
import { createArticleHandler } from './createArticleHandler';

const ArticleRepositoryStub = jest.fn<ArticleRepository>(() => ({
  save: jest.fn().mockResolvedValue(undefined)
}));

describe('Create article hander', () => {
  let articleRepository: ArticleRepository;
  let handler: MessageHandler<ArticleCreation, void>;

  beforeEach(() => {
    articleRepository = new ArticleRepositoryStub();
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
});
