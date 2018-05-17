import { DbArticle } from '../command';

export interface ArticleView {
  id: string;
  title: string;
  text: string;
}

export function dbArticleToView(dbArticle: DbArticle): ArticleView {
  if (!dbArticle) {
    return null;
  }
  const { id, title, text } = dbArticle;
  return { id, title, text };
}
