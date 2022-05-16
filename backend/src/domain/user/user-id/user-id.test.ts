import { UserId } from './user-id';

describe('UserId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(UserId.create()).toEqual(expect.any(UserId));
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(UserId.reBuild('test-id')).toEqual(expect.any(UserId));
    });
  });
});
