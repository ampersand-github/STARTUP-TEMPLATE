import { BorrowId } from 'src/domain/book/borrower/_borrow/borrow-id/borrow-id';

describe('BorrowId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(BorrowId.create()).toEqual(expect.any(BorrowId));
    });
  });
  describe('reConstruct()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(BorrowId.reConstruct('test-id')).toEqual(expect.any(BorrowId));
    });
  });
});
