import { ArticleRepository } from '../command';

export const ArticleRepositoryMock = jest.fn<ArticleRepository>(() => ({
  save: jest.fn().mockResolvedValue(undefined)
}));
