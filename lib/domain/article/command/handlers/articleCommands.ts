import { messageCreator } from '@arpinum/messaging';

export interface ArticleCreation {
  id: string;
  title: string;
  text: string;
}

export const articleCommands = {
  createArticle: messageCreator<ArticleCreation>('CREATE_ARTICLE')
};
