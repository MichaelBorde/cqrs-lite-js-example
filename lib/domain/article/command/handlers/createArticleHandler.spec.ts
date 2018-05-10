import { MessageHandler } from '@arpinum/messaging';
import { SinonStub, stub } from 'sinon';

import { examples } from '../../../../test';
import { ArticleRepository } from '../articleRepository';
import {
  createArticleHandler,
  CreateArticlePayload
} from './createArticleHandler';

describe('Create article hander', () => {
  let articleRepository: ArticleRepository;
  let handler: MessageHandler<CreateArticlePayload, void>;

  beforeEach(() => {
    articleRepository = {
      save: stub().resolves()
    };
    handler = createArticleHandler({ articleRepository });
  });

  it('should create an article and save it', async () => {
    const payload = {
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    };

    await handler({ type: '', payload });

    const saveStub = articleRepository.save as SinonStub;
    expect(saveStub.called).toBeTruthy();
    const savedArticle = saveStub.lastCall.args[0];
    expect(savedArticle).toEqual({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });
  });
});
