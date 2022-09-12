import { BorrowerId } from "./borrower-id";


describe('BorrowId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(BorrowerId.create()).toEqual(expect.any(BorrowerId));
    });
  });
  describe('reConstruct()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(BorrowerId.reConstruct('test-id')).toEqual(expect.any(BorrowerId));
    });
  });
});
