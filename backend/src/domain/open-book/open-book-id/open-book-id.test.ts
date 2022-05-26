import { OpenBookId } from './open-book-id';

describe('OpenBookId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(OpenBookId.create()).toStrictEqual(expect.any(OpenBookId));
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(OpenBookId.reBuild('test-id')).toStrictEqual(
        expect.any(OpenBookId),
      );
    });
  });
});
