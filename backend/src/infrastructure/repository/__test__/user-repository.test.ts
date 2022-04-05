import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { UserRepository } from 'src/infrastructure/repository/user-repository';
import { Email } from 'src/domain/user/email';
import { IUser, User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id';

describe('userRepository', () => {
  const prismaService = new PrismaService();
  const userRepository = new UserRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findAll', () => {
    test('データが１件もない', async () => {
      const result = await userRepository.findAll();
      expect(result).toEqual([]);
    });
    test('正常に全件取得できる', async () => {
      await prismaService.users.createMany({
        data: [
          convertToPrismaData(user1),
          convertToPrismaData(user2),
          convertToPrismaData(user3),
        ],
      });
      const actual = await userRepository.findAll();
      expect(actual).toEqual([user1, user2, user3]);
    });
  });

  describe('findOne', () => {
    test('データが１件もない', async () => {
      const userId = UserId.reBuild('aaa');
      const result = await userRepository.findOne(userId);
      expect(result).toEqual(null);
    });
    test('データが合致する', async () => {
      await prismaService.users.create({ data: convertToPrismaData(user1) });
      const result = await userRepository.findOne(user1.id);
      expect(result).toEqual(user1);
      expect(result.equals(user1)).toBe(true);
    });
  });
});

// - - - - - 以下、テストで使用するデータ - - - - -
const convertToPrismaData = (user: User) => {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
  };
};
//
const userId1 = UserId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
const email1 = new Email({ email: 'aaa@gmail.com' });
const props1: IUser = { name: '山田太郎', email: email1 };
const user1 = User.reBuild(props1, userId1);
//
const userId2 = UserId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
const email2 = new Email({ email: 'bbb@gmail.com' });
const props2: IUser = { name: '鈴木次郎', email: email2 };
const user2 = User.reBuild(props2, userId2);
//
const userId3 = UserId.reBuild('6c2faf45-8fae-48ad-e660-c5d1c92920c2');
const email3 = new Email({ email: 'ccc@gmail.com' });
const props3: IUser = { name: '田中三郎', email: email3 };
const user3 = User.reBuild(props3, userId3);
