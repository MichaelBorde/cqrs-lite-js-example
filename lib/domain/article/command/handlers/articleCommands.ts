import { messageCreator } from '@arpinum/messaging';

export interface CreateArticlePayload {
  id: string;
  title: string;
  text: string;
}

export interface ChangeArticleTitlePayload {
  id: string;
  title: string;
}

export const articleCommands = {
  createArticle: messageCreator<CreateArticlePayload>('CREATE_ARTICLE'),
  changeArticleTitle: messageCreator<ChangeArticleTitlePayload>(
    'CHANGE_ARTICLE_TITLE'
  )
};
