import { Message, MessageHandler } from '@arpinum/messaging';

import { Article } from '../article';
import { ArticleRepository } from '../articleRepository';
import { CreateArticlePayload } from './articleCommands';

interface Dependencies {
  articleRepository: ArticleRepository;
}

export function createArticleHandler(
  dependencies: Dependencies
): MessageHandler<CreateArticlePayload, void> {
  const { articleRepository } = dependencies;
  return async (message: Message<CreateArticlePayload>) => {
    const { id, title, text } = message.payload;
    const article = new Article({ id, title, text });
    await articleRepository.save(article);
  };
}
