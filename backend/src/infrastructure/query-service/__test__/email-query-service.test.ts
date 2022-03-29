import { PrismaService } from '../../prisma/prisma.service';
import { EmailQueryService } from '../email-query-service';
import { truncateAllTable } from '../../__shared__/truncate-all-table';

describe('EmailQueryService', () => {
  const prismaService = new PrismaService();
  const emailQueryService = new EmailQueryService(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('matchEmail', () => {
    test('メールアドレスの重複が１件もない', async () => {
      await initData(prismaService);
      const actual = await emailQueryService.matchEmail('zero@gmail.com');
      expect(actual).toBe(false);
    });
    test('すでにメールアドレスが存在する', async () => {
      await initData(prismaService);
      const actual = await emailQueryService.matchEmail('aaa@gmail.com');
      expect(actual).toBe(true);
    });
  });
});

const initData = async (prismaService: PrismaService) => {
  const userId1 = 'af78b05b1-d97d-8fd3-950a-3c14d4d4a7b1';
  const userId2 = '86003efc-367a-6ddd-edd2-33a5ceafca6b';
  const userId3 = '2c65eec4-7519-533c-c30f-86438c095de9';
  await prismaService.users.createMany({
    data: [{ id: userId1 }, { id: userId2 }, { id: userId3 }],
  });

  await prismaService.user_profiles.createMany({
    data: [
      {
        id: 'f106fd01-93c4-a877-5c39-c74c8468014f',
        email: 'aaa@gmail.com',
        user_id: userId1,
        name: '',
        description: '',
      },
      {
        id: '315a1011-c51f-694e-d864-f587ea383fc1',
        email: 'bbb@gmail.com',
        user_id: userId2,
        name: '',
        description: '',
      },
      {
        id: 'e172e972-9e80-df11-1f9b-f925a1f36567',
        email: 'ccc@gmail.com',
        user_id: userId3,
        name: '',
        description: '',
      },
    ],
  });
};
