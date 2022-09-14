import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { BookId } from './book-id/book-id';
import { BookSize } from './book-size/book-size';
import { Borrower } from './borrower/borrower';
import { ReservationList } from './reservation-list/reservation-list';

export interface IBook {
  name: string;
  author: string;
  bookSize: BookSize; // 定数系値オブジェクト
  borrower?: Borrower; // 普通の値オブジェクト
  reservationList: ReservationList; // 配列の値オブジェクト（ファーストクラスコレクション）
}

export class Book extends AggregateRoot<IBook, BookId> {
  public readonly name: IBook['name'];
  public readonly author: IBook['author'];
  public readonly bookSize: IBook['bookSize'];
  public readonly borrower: IBook['borrower'];
  public readonly reservationList: IBook['reservationList'];

  private constructor(props: IBook, id: BookId) {
    super(props, id);
    this.name = props.name;
    this.author = props.author;
    this.bookSize = props.bookSize;
    this.borrower = props.borrower;
    this.reservationList = props.reservationList;
  }

  public static construct(props: IBook): Book {
    return new Book(props, BookId.construct());
  }

  public static reConstruct(props: IBook, id: BookId): Book {
    return new Book(props, id);
  }

  bowwowBook() {
    // todo 今この書籍を誰も借りていないこと
    throw new Error('未実装');
  }

  returnBook() {
    // todo 検討、返却されたとき、返却日をどう入れる？
    throw new Error('未実装');
  }

  addReservation() {
    // todo 1人で複数回の予約は取れない
    throw new Error('未実装');
  }

  removeReservation() {
    throw new Error('未実装');
  }

  postpone() {
    // todo 予約がなければ延期できる
    throw new Error('未実装');
  }
}
