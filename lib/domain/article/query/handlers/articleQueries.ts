import { messageCreator } from '@arpinum/messaging';

export interface GetArticleByIdPayload {
  id: string;
}

export const articleQueries = {
  getAllArticles: messageCreator('FIND_ARTICLES'),
  getArticleById: messageCreator<GetArticleByIdPayload>('GET_ARTICLE_BY_ID')
};
