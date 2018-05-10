import { ArticleRepository } from '../articleRepository';
import { articleCommands } from './articleCommands';
import { createArticleHandler } from './createArticleHandler';

interface Dependencies {
  articleRepository: ArticleRepository;
}

export function articleCommandHandlers(dependencies: Dependencies) {
  const { articleRepository } = dependencies;
  return {
    [articleCommands.createArticle]: createArticleHandler({
      articleRepository
    })
  };
}
