import { UserId } from './user-id';

describe('UserId', () => {
  it('create()', () => {
    expect(UserId.construct()).toEqual(expect.any(UserId));
    it('reConstruct()', () => {
      const expected = UserId.reConstruct('test-id');
      expect(expected).toStrictEqual(expect.any(UserId));
    });
  });
});
