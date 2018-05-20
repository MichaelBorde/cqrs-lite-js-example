import { Message, MessageHandler } from '@arpinum/messaging';

import { ArticleRepository } from '../articleRepository';
import { CreateArticlePayload } from './articleCommands';

interface Dependencies {
  articleRepository: ArticleRepository;
}

export function changeArticleTitleHandler(
  dependencies: Dependencies
): MessageHandler<CreateArticlePayload, void> {
  const { articleRepository } = dependencies;
  return async (message: Message<CreateArticlePayload>) => {
    try {
      const { id, title } = message.payload;
      const article = await articleRepository.getById(id);
      article.changeTitle(title);
      await articleRepository.update(article);
    } catch (error) {
      throw new Error("Cannot change article's title");
    }
  };
}
