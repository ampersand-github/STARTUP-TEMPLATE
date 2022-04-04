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
  await prismaService.users.createMany({
    data: [
      {
        id: 'f106fd01-93c4-a877-5c39-c74c8468014f',
        email: 'aaa@gmail.com',
        name: '',
      },
      {
        id: '315a1011-c51f-694e-d864-f587ea383fc1',
        email: 'bbb@gmail.com',
        name: '',
      },
      {
        id: 'e172e972-9e80-df11-1f9b-f925a1f36567',
        email: 'ccc@gmail.com',
        name: '',
      },
    ],
  });
};
