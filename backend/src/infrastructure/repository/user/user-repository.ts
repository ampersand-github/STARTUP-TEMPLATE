import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { users as IPrismaUsers } from '@prisma/client';
import { User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id/user-id';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { userConverter } from './user-converter';

export type IPrismaUser = IPrismaUsers;

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findOne(UserId: UserId): Promise<User | null> {
    const user: IPrismaUser = await this.prisma.users.findUnique({
      where: { id: UserId.toString() },
    });
    return user ? userConverter(user) : null;
  }

  async save(entity: User): Promise<void> {
    await this.prisma.users.upsert({
      where: { id: entity.id.toString() },
      create: {
        id: entity.id.toString(),
        name: entity.getName(),
      },
      update: {
        name: entity.getName(),
      },
    });
  }
}
