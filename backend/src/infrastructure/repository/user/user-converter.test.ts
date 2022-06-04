import { IPrismaUser } from './user-repository';
import { userConverter } from './user-converter';
import { User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id/user-id';

describe('userConverter', () => {
  it('コンバートできる', () => {
    const userId1 = UserId.reBuild('33f14742-b9cf-e964-ba02-be9bc5baad88');
    const prismaUser1: IPrismaUser = {
      id: userId1.toString(),
      name: 'user1',
      updated_at: new Date(),
      created_at: new Date(),
    };
    const user1 = User.reBuild({ name: prismaUser1.name }, userId1);
    const actual = userConverter(prismaUser1);
    expect(actual).toStrictEqual(user1);
  });
});
