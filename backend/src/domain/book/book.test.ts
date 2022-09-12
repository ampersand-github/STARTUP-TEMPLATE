import { BookId } from './book-id/book-id';
import { Book, IBook } from './book';
import { BOOK_SIZE_TYPE, BookSize } from './book-size/book-size';

describe('Book', () => {
  const props: IBook = {
    name: 'book1',
    author: 'author',
    bookSize: new BookSize({ value: BOOK_SIZE_TYPE.bigSize }),
    borrower: undefined,
    reservationList: undefined,
  };

  describe('インスタンスの生成', () => {
    const book = Book.construct(props);

    describe('インスタンスの生成', () => {
      it('construct()', () => {
        expect(book).toStrictEqual(expect.any(Book));
      });
      it('reConstruct()', () => {
        const id = '43145f95-2034-4fae-b88f-ca0bdf7890bd';
        const bookId = BookId.reConstruct(id);
        const book = Book.reConstruct(props, bookId);
        expect(book.id).toStrictEqual(bookId);
        expect(book).toStrictEqual(expect.any(Book));
      });
    });

    describe('get()', () => {
      const expected = Book.construct(props);
      it('', () => {
        expect(expected.name).toStrictEqual(props.name);
        expect(expected.author).toStrictEqual(props.author);
        expect(expected.bookSize).toStrictEqual(props.bookSize);
        expect(expected.borrower).toStrictEqual(props.borrower);
        expect(expected.reservationList).toStrictEqual(props.reservationList);
      });
    });
  });
});
