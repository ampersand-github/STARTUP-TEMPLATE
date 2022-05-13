import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { users as IPrismaUsers } from '@prisma/client';
import { IUser, User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id/user-id';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  // prismaから取得した値をドメインオブジェクトに変換する
  private static converter(prismaUser: IPrismaUsers): User {
    const userId = UserId.reBuild(prismaUser.id);
    const props: IUser = {
      name: prismaUser.name,
    };
    return User.reBuild(props, userId);
  }

  async findAll(): Promise<User[]> {
    // データの取得
    const allUsers: IPrismaUsers[] = await this.prisma.users.findMany();

    // データの加工
    return allUsers.map((one: IPrismaUsers): User => {
      return UserRepository.converter(one);
    });
  }

  async findOne(UserId: UserId): Promise<User | null> {
    const user: IPrismaUsers = await this.prisma.users.findUnique({
      where: { id: UserId.toString() },
    });
    return user ? UserRepository.converter(user) : null;
  }
}
