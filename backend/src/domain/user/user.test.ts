import { UserId } from 'src/domain/user/user-id/user-id';
import { IUser, User } from 'src/domain/user/user';

describe('User', () => {
  // given:
  const props: IUser = {
    stripeCustomerId: undefined,
    name: '田中太郎',
    tel: '09011112222',
  };

  describe('constructor', () => {
    it('createできる', () => {
      // when:
      const user = User.construct(props);
      // then:
      expect(user).toStrictEqual(expect.any(User));
    });
    it('reBuildできる', () => {
      // when:
      const userId = UserId.reConstruct('43145f95-2034-4fae-b88f-ca0bdf7890bd');
      const user = User.reConstruct(props, userId);
      // then:
      expect(user).toStrictEqual(expect.any(User));
      expect(user.id).toStrictEqual(userId);
    });
  });

  describe('get', () => {
    // when:
    const user = User.construct(props);
    it('取得できる', () => {
      // then:
      expect(user.stripeCustomerId).toStrictEqual(props.stripeCustomerId);
      expect(user.name).toStrictEqual(props.name);
      expect(user.tel).toStrictEqual(props.tel);
    });
  });
});
