import { BookId } from 'src/domain/book/book-id';

describe('BookId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(BookId.create()).toEqual(expect.any(BookId));
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(BookId.reBuild('test-id')).toEqual(expect.any(BookId));
    });
  });
});
