import { IOpenBook, OpenBook } from './open-book';
import { BookId } from '../book/book-id/book-id';
import { BorrowId } from '../borrow/borrow-id/borrow-id';
import { OpenBookId } from './open-book-id/open-book-id';

describe('OpenBook', () => {
  const props: IOpenBook = {
    bookId: BookId.create(),
    borrowingId: BorrowId.create(),
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 以下テスト
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe('constructor', () => {
    it('createできる', () => {
      const openBook = OpenBook.create(props);
      expect(openBook).toStrictEqual(expect.any(OpenBook));
    });
    it('reBuildできる', () => {
      const openBookId = OpenBookId.reBuild(
        '43145f95-2034-4fae-b88f-ca0bdf7890bd',
      );
      const openBook = OpenBook.reBuild(props, openBookId);
      expect(openBook).toStrictEqual(expect.any(OpenBook));
      expect(openBook.id).toStrictEqual(openBookId);
    });

    describe('get()', () => {
      const expected = OpenBook.create(props);
      it('getBookId()', () => {
        expect(expected.getBookId()).toStrictEqual(props.bookId);
      });
      it('getAuthor()', () => {
        expect(expected.getBorrowingId()).toStrictEqual(props.borrowingId);
      });
    });

    describe('idBorrowing()', () => {
      it('現在、借りられていない', () => {
        const actual = OpenBook.create({
          bookId: BookId.create(),
          borrowingId: undefined,
        });
        expect(actual.idBorrowing()).toStrictEqual(false);
      });
      it('現在、借りられている', () => {
        const actual = OpenBook.create({
          bookId: BookId.create(),
          borrowingId: BorrowId.create(),
        });
        expect(actual.idBorrowing()).toStrictEqual(true);
      });
    });
  });
});
