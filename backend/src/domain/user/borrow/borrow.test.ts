import { Borrow, IBorrow } from './borrow';
import { BookId } from '../../book/book-id/book-id';
import { UserId } from '../user-id/user-id';

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
      const borrow1 = Borrow.create(notReturnedBookProps);
      expect(borrow1).toEqual(expect.any(Borrow));
    });

    // describe
    describe('canBorrow()', () => {
      it('借りることができる', () => {
        const notReturnedBook = Borrow.create(notReturnedBookProps);
        const actual = notReturnedBook.canBorrow();
        expect(actual).toStrictEqual(true);
      });
      it('すでに誰かに借りられているのでレンタルできない', () => {
        const returnedBook = Borrow.create(returnedBookProps);
        const actual = returnedBook.canBorrow();
        expect(actual).toStrictEqual(false);
      });
    });
  });
});
