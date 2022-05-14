import { Borrow, IBorrow } from './borrow';
import { BookId } from '../book-id/book-id';
import { UserId } from '../../user/user-id/user-id';

describe('Book', () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // props
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const returnedBookProps: IBorrow = {
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: new Date(),
  };

  const notReturnedBookProps: IBorrow = {
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: null,
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 以下テスト
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe('constructor', () => {
    it('createできる', () => {
      const borrow1 = new Borrow(notReturnedBookProps);
      expect(borrow1).toEqual(expect.any(Borrow));
    });

    // describe
    describe('canBorrow()', () => {
      it('借りることができる', () => {
        const notReturnedBook = new Borrow(notReturnedBookProps);
        const actual = notReturnedBook.canBorrow();
        expect(actual).toStrictEqual(true);
      });
      it('すでに誰かに借りられているのでレンタルできない', () => {
        const returnedBook = new Borrow(returnedBookProps);
        const actual = returnedBook.canBorrow();
        expect(actual).toStrictEqual(false);
      });
    });

    describe('returnBook()', () => {
      it('返却できる', () => {
        const notReturnedBook = new Borrow(notReturnedBookProps);
        const actual = notReturnedBook.returnBook();
        expect(actual).toEqual(expect.any(Borrow));
      });
      it('返却済みは返却できない', () => {
        const returnedBook = new Borrow(returnedBookProps);
        const actual = () => returnedBook.returnBook();
        expect(actual).toThrowError('返却済みです。');
      });
    });
  });
});
