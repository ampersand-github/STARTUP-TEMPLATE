import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { TagList } from './tag/tag-list';
import { BookId } from './book-id/book-id';

export interface IBook {
  name: string;
  author: string;
  tagList: TagList;
}

export class Book extends AggregateRoot<IBook, BookId> {
  private readonly name: string;
  private readonly author: string;
  private readonly tagList: TagList;

  public getName() {
    return this.name;
  }

  public getAuthor() {
    return this.author;
  }

  public getTagList() {
    return this.tagList;
  }

  private constructor(props: IBook, id: BookId) {
    super(props, id);
    this.name = props.name;
    this.author = props.author;
    this.tagList = props.tagList;
  }

  public static create(props: IBook): Book {
    return new Book(props, BookId.create());
  }

  public static reBuild(props: IBook, id: BookId): Book {
    return new Book(props, id);
  }
}
