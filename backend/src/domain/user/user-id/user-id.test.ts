import { UserId } from './user-id';

describe('UserId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(UserId.construct()).toEqual(expect.any(UserId));
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      const expected = UserId.reConstruct('test-id')
      expect(expected).toStrictEqual(expect.any(UserId));
    });
  });
});
