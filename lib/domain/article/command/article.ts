import { AggregateRoot } from '../../../ddd';

export class Article extends AggregateRoot {
  public id: string;
  public title: string;
  public text: string;

  constructor(rawArticle: { id: string; title: string; text: string }) {
    super(rawArticle.id);
    const { title, text } = rawArticle;
    this.title = title;
    this.text = text;
  }
}
