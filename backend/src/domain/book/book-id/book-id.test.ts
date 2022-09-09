import { BookId } from 'src/domain/book/book-id/book-id';

describe('BookId', () => {
  describe('オブジェクトが生成ができる', () => {
    it('construct()', () => {
      expect(BookId.construct()).toEqual(expect.any(BookId));
    });
    it('reConstruct()', () => {
      expect(BookId.reConstruct('test-id')).toEqual(expect.any(BookId));
    });
  });
});
