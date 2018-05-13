import { messageCreator } from '@arpinum/messaging';

export const articleQueries = {
  findArticles: messageCreator<void>('FIND_ARTICLES')
};
