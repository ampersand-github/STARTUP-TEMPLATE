import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import {
  borrow_histories as IPrismaBorrowHistories,
  users as IPrismaUsers,
} from '@prisma/client';
import { User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id/user-id';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { userConverter } from './user-converter';
import { Borrow } from '../../../domain/user/borrow/borrow';

export type IPrismaUser = IPrismaUsers & {
  borrow_histories: IPrismaBorrowHistories[];
};

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findAll(): Promise<User[]> {
    // データの取得
    const allUsers: IPrismaUsers[] = await this.prisma.users.findMany({
      include: { borrow_histories: { where: { end_at: null } } },
    });

    // データの加工
    return allUsers.map((one: IPrismaUser): User => {
      return userConverter(one);
    });
  }

  async findOne(UserId: UserId): Promise<User | null> {
    const user: IPrismaUser = await this.prisma.users.findUnique({
      where: { id: UserId.toString() },
      include: { borrow_histories: { where: { end_at: null } } },
    });
    return user ? userConverter(user) : null;
  }

  async save(entity: User): Promise<void> {
    await this.prisma.users.upsert({
      where: { id: entity.id.toString() },
      include: { borrow_histories: true },
      create: {
        id: entity.id.toString(),
        name: entity.getName(),
        borrow_histories: {
          createMany: {
            data: entity
              .getBorrowingList()
              .getCollection()
              .map((one: Borrow) => {}),
          },
        },
      },
    });
  }
}