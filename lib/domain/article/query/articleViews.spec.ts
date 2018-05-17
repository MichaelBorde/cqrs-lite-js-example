import { examples } from '../../../test';
import { dbArticleToView } from './articleViews';

describe('While converting db article to view', () => {
  it('should return null if input is so', () => {
    expect(dbArticleToView(null)).toBeNull();
  });

  it('should use input information', () => {
    const dbArticle = {
      id: examples.uuid,
      title: 'Hello',
      text: 'This is a post'
    };

    const view = dbArticleToView(dbArticle);

    expect(view).toEqual({
      id: examples.uuid,
      title: 'Hello',
      text: 'This is a post'
    });
  });
});
