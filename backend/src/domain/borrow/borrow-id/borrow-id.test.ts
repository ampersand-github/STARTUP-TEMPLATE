import { BorrowId } from 'src/domain/borrow/borrow-id/borrow-id';

describe('BorrowId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(BorrowId.create()).toEqual(expect.any(BorrowId));
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(BorrowId.reBuild('test-id')).toEqual(expect.any(BorrowId));
    });
  });
});
