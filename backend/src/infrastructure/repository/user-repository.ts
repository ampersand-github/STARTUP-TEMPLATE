import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { User, IUser } from 'src/domain/User/User';
import { IUserRepository } from 'src/domain/User/__interface__/User-repository-interface';
import { UserId } from 'src/domain/User/User-id';
import { users as IPrismaUsers } from '@prisma/client';
import { Email } from 'src/domain/user/email';

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
      email: new Email({ email: prismaUser.email }),
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
