import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { TagList } from './tag/tag-list';
import { BookId } from './book-id/book-id';
import { Borrow } from './borrow/borrow';

export interface IBook {
  name: string;
  author: string;
  tagList: TagList;
  isLost: boolean;
  isPrivate: boolean;
  latestBorrow: Borrow;
}

export class Book extends AggregateRoot<IBook, BookId> {
  private readonly name: string;
  private readonly author: string;
  private readonly tagList: TagList;
  private readonly isLost: boolean;
  private readonly isPrivate: boolean;
  private readonly latestBorrow: Borrow;

  private constructor(props: IBook, id: BookId) {
    super(props, id);
    this.name = props.name;
    this.author = props.author;
    this.tagList = props.tagList;
    this.isLost = props.isLost;
    this.isPrivate = props.isPrivate;
    this.latestBorrow = props.latestBorrow;
  }

  public static create(props: IBook): Book {
    return new Book(props, BookId.create());
  }

  public static reBuild(props: IBook, id: BookId): Book {
    return new Book(props, id);
  }
}
