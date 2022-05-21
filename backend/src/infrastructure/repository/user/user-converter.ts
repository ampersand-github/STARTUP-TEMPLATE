import { IPrismaUser } from './user-repository';
import { IUser, User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id/user-id';

export const userConverter = (prismaUser: IPrismaUser): User => {
  const props: IUser = {
    name: prismaUser.name,
  };
  const userId = UserId.reBuild(prismaUser.id);

  return User.reBuild(props, userId);
};
