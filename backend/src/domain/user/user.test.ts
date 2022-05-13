import { UserId } from 'src/domain/user/user-id/user-id';
import { IUser, User } from 'src/domain/user/user';

describe('User', () => {
  const name = '田中太郎';
  const props: IUser = { name: name };

  describe('constructor', () => {
    it('createできる', () => {
      const user = User.create(props);
      expect(user).toEqual(expect.any(User));
    });
    it('reBuildできる', () => {
      const userId = UserId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
      const user = User.reBuild(props, userId);
      expect(user).toEqual(expect.any(User));
      expect(user.id).toEqual(userId);
    });
  });

  describe('get', () => {
    const user = User.create(props);
    it('nameが正しく取得できる', () => {
      expect(user.name).toEqual(props.name);
    });
  });
});
