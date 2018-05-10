import { examples } from '../../../test';
import { Article } from './article';

describe('Article', () => {
  describe('on construction', () => {
    it('should use raw information', () => {
      const article = new Article({
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      });

      expect(article).toEqual({
        id: examples.uuid,
        title: 'I have a new cat',
        text: 'Its name is Garfield'
      });
    });
  });
});
