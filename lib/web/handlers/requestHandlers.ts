import { MessageBus } from '@arpinum/messaging';
import { Handler } from 'express';

import {
  articleGet,
  articlesGet,
  articlesPost,
  articleTitlePut
} from './articles';

interface RequestHandlersDependencies {
  commandBus: MessageBus;
  queryBus: MessageBus;
}

export class RequestHandlers {
  public articleGet: Handler;
  public articlesGet: Handler;
  public articlesPost: Handler;
  public articleTitlePut: Handler;

  constructor(dependencies: RequestHandlersDependencies) {
    const { commandBus, queryBus } = dependencies;
    this.articleGet = articleGet({ queryBus });
    this.articlesGet = articlesGet({ queryBus });
    this.articlesPost = articlesPost({ commandBus });
    this.articleTitlePut = articleTitlePut({ commandBus });
  }
}
