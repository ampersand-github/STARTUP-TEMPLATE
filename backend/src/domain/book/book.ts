import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { TagList } from './tag-list';
import { BookId } from './book-id';

export interface IBook {
  name: string;
  tagList: TagList;
  author: string;
  rating: number; // todo あとで値オブジェクト化
}

export class Book extends AggregateRoot<IBook, BookId> {
  public get name(): string {
    return this.props.name;
  }

  public get tagList(): string[] {
    return this.props.tagList.values;
  }
  public get author(): string {
    return this.props.author;
  }

  public get rating(): number {
    return this.props.rating;
  }


  public static create(props: IBook): Book {
    return new Book(props, BookId.create());
  }

  public static reBuild(props: IBook, id: BookId): Book {
    return new Book(props, id);
  }
}
