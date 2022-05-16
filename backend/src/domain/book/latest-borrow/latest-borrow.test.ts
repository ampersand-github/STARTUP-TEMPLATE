import { ILatestBorrow, LatestBorrow } from './latest-borrow';

describe('Book', () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // props
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const returnedBookProps: ILatestBorrow = {
    startAt: new Date(),
    endAt: new Date(),
  };

  const notReturnedBookProps: ILatestBorrow = {
    startAt: new Date(),
    endAt: null,
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 以下テスト
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe('constructor', () => {
    it('createできる', () => {
      const borrow1 = new LatestBorrow(notReturnedBookProps);
      expect(borrow1).toEqual(expect.any(LatestBorrow));
    });

    // describe
    describe('canBorrow()', () => {
      it('借りることができる', () => {
        const notReturnedBook = new LatestBorrow(notReturnedBookProps);
        const actual = notReturnedBook.canBorrow();
        expect(actual).toStrictEqual(true);
      });
      it('すでに誰かに借りられているのでレンタルできない', () => {
        const returnedBook = new LatestBorrow(returnedBookProps);
        const actual = returnedBook.canBorrow();
        expect(actual).toStrictEqual(false);
      });
    });
  });
});
