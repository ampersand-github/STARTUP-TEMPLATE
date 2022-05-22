import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { UserRepository } from './user-repository';
import { PrismaService } from '../../prisma/prisma.service';
import { UserId } from '../../../domain/user/user-id/user-id';
import { User } from '../../../domain/user/user';

describe('userRepository', () => {
  const prismaService = new PrismaService();
  const userRepository = new UserRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('save()/findOne()', () => {
    const userId = UserId.reBuild('803298db-f5c4-2f7c-39a7-026da6c9ea03');
    const user1 = User.reBuild(
        {
          name: 'user1',
        },
        userId,
    );

    test('新規登録できる', async () => {
      await userRepository.save(user1);
      const actual = await userRepository.findOne(userId);
      expect(actual).toStrictEqual(user1);
    });
    test('更新できる', async () => {
        const user1Update = User.reBuild(
        {
          name: 'user1update',
        },
        userId,
      );
      await userRepository.save(user1);
      await userRepository.save(user1Update);
      const actual = await userRepository.findOne(userId);
      expect(actual).toStrictEqual(user1Update);
      expect(actual).not.toStrictEqual(user1);
      expect(await prismaService.users.count()).toStrictEqual(1);
    });
  });
});
