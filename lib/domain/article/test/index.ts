import { ArticleRepository } from '../command';

export const ArticleRepositoryMock = jest.fn<ArticleRepository>(() => ({
  getById: jest.fn().mockResolvedValue(undefined),
  save: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined)
}));
