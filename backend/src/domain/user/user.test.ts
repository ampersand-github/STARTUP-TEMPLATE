import { UserId } from 'src/domain/user/user-id/user-id';
import { IUser, User } from 'src/domain/user/user';

describe('User', () => {
  const props: IUser = {
    stripeCustomerId: undefined,
    name: '田中太郎',
    tel: '09011112222',
  };

  describe('constructor', () => {
    it('createできる', () => {
      const user = User.construct(props);
      expect(user).toStrictEqual(expect.any(User));
    });
    it('reBuildできる', () => {
      const userId = UserId.reConstruct('43145f95-2034-4fae-b88f-ca0bdf7890bd');
      const user = User.reConstruct(props, userId);
      expect(user).toStrictEqual(expect.any(User));
      expect(user.id).toStrictEqual(userId);
    });
  });

  describe('get', () => {
    const user = User.construct(props);
    it('取得できる', () => {
      expect(user.stripeCustomerId).toStrictEqual(props.stripeCustomerId);
      expect(user.name).toStrictEqual(props.name);
      expect(user.tel).toStrictEqual(props.tel);
    });
  });
});
