import { ArticleRepository } from '../articleRepository';
import { articleCommands as commands } from './articleCommands';
import { changeArticleTitleHandler } from './changeArticleTitleHandler';
import { createArticleHandler } from './createArticleHandler';

interface Dependencies {
  articleRepository: ArticleRepository;
}

export function articleCommandHandlers(dependencies: Dependencies) {
  const { articleRepository } = dependencies;
  return {
    [commands.createArticle.toString()]: createArticleHandler({
      articleRepository
    }),
    [commands.changeArticleTitle.toString()]: changeArticleTitleHandler({
      articleRepository
    })
  };
}
