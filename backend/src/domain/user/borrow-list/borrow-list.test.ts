import { BorrowingList } from './borrow-list';
import { Borrow } from '../../book/borrow/borrow';
import { BookId } from '../../book/book-id/book-id';
import { UserId } from '../user-id/user-id';

describe('BorrowList', () => {
  const borrow1 = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: undefined,
  });
  const borrow2 = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: new Date(),
  });
  const borrow3 = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: undefined,
  });
  const borrow4 = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: undefined,
  });
  const borrow5 = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: undefined,
  });
  const borrow6 = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: undefined,
  });

  describe('constructor()', () => {
    it('オブジェクトの生成ができる', () => {
      const borrowList = new BorrowingList({
        borrowList: [borrow1, borrow2, borrow3],
      });
      expect(borrowList).toEqual(expect.any(BorrowingList));
    });
    it('5冊のレンタルができる', () => {
      const borrowList = new BorrowingList({
        borrowList: [borrow1, borrow2, borrow3, borrow4, borrow5],
      });
      expect(borrowList).toEqual(expect.any(BorrowingList));
    });
    it('6冊のレンタルはできない', () => {
      const actual = () => {
        new BorrowingList({
          borrowList: [borrow1, borrow2, borrow3, borrow4, borrow5, borrow6],
        });
      };
      expect(actual).toThrowError('貸出は一人5冊までです');
    });
  });

  describe('getCollection', () => {
    const borrowList = new BorrowingList({
      borrowList: [borrow1, borrow2, borrow3],
    });
    const collection = borrowList.getCollection();
    expect(collection).toEqual(
      expect.arrayContaining([borrow1, borrow2, borrow3]),
    );
  });
});
