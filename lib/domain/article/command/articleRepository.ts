import { Repository } from '../../../ddd';
import { Article } from './article';

export interface ArticleRepository extends Repository<Article> {}
