import { Router } from 'express';
import PromiseRouter from 'express-promise-router';

import { RequestHandlers } from './handlers';

interface RouterDependencies {
  requestHandlers: RequestHandlers;
}

export function createRouter(dependencies: RouterDependencies): Router {
  const { requestHandlers } = dependencies;
  const routing = PromiseRouter();
  routing.post('/articles', requestHandlers.articlesPost);
  routing.get('/articles', requestHandlers.articlesGet);
  routing.get('/articles/:id', requestHandlers.articleGet);
  return routing;
}
