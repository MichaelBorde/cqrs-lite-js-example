import { Message, MessageHandler } from '@arpinum/messaging';

import { Article } from '../article';
import { ArticleRepository } from '../articleRepository';

interface Dependencies {
  articleRepository: ArticleRepository;
}

export interface CreateArticlePayload {
  id: string;
  title: string;
  text: string;
}

export function createArticleHandler(
  dependencies: Dependencies
): MessageHandler<CreateArticlePayload, void> {
  const { articleRepository } = dependencies;
  return (message: Message<CreateArticlePayload>) => {
    const { id, title, text } = message.payload;
    const article = new Article({ id, title, text });
    return articleRepository.save(article);
  };
}
