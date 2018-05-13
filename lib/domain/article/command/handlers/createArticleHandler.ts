import { Message, MessageHandler } from '@arpinum/messaging';

import { Article } from '../article';
import { ArticleRepository } from '../articleRepository';
import { ArticleCreation } from './articleCommands';

interface Dependencies {
  articleRepository: ArticleRepository;
}

export function createArticleHandler(
  dependencies: Dependencies
): MessageHandler<ArticleCreation, void> {
  const { articleRepository } = dependencies;
  return (message: Message<ArticleCreation>) => {
    const { id, title, text } = message.payload;
    const article = new Article({ id, title, text });
    return articleRepository.save(article);
  };
}
