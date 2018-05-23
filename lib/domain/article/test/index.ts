import { MemoryRepository } from '../../../ddd';
import { Article, ArticleRepository } from '../command';

export class MemoryArticleRepository extends MemoryRepository<Article>
  implements ArticleRepository {}
