import { BookId } from './book-id/book-id';
import { Book, IBook } from './book';
import { BOOK_SIZE_TYPE, BookSize } from './book-size/book-size';

describe('Book', () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // props
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const props: IBook = {
    name: 'book1',
    author: 'author',
    bookSize: new BookSize({ value: BOOK_SIZE_TYPE.bigSize }),
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 以下テスト
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe('インスタンスの生成', () => {
    it('construct()', () => {
      const book = Book.construct(props);
      expect(book).toStrictEqual(expect.any(Book));
    });
    it('reConstruct()', () => {
      const id = '43145f95-2034-4fae-b88f-ca0bdf7890bd';
      const bookId = BookId.reConstruct(id);
      const book = Book.reConstruct(props, bookId);
      expect(book).toStrictEqual(expect.any(Book));
      expect(book.id).toStrictEqual(bookId);
    });

    describe('get()', () => {
      const expected = Book.construct(props);
      it('', () => {
        expect(expected.name).toStrictEqual(props.name);
        expect(expected.author).toStrictEqual(props.author);
        expect(expected.bookSize).toStrictEqual(props.bookSize);
      });
    });
  });
});
