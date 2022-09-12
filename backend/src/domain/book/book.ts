import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { BookId } from './book-id/book-id';
import { BookSize } from './book-size/book-size';
import { Borrower } from "./borrower/borrower";

class ReservationList {
}

export interface IBook {
  name: string;
  author: string;
  bookSize: BookSize;
  borrower?:Borrower;
  reservationList:ReservationList
}

export class Book extends AggregateRoot<IBook, BookId> {
  public readonly name: IBook["name"];
  public readonly author: IBook["author"];
  public readonly bookSize: IBook["bookSize"];
  public readonly borrower: IBook["borrower"];
  public readonly reservationList: IBook["reservationList"];

  private constructor(props: IBook, id: BookId) {
    super(props, id);
    this.name = props.name;
    this.author = props.author;
    this.bookSize = props.bookSize;
  }

  public static construct(props: IBook): Book {
    return new Book(props, BookId.construct());
  }

  public static reConstruct(props: IBook, id: BookId): Book {
    return new Book(props, id);
  }
}
