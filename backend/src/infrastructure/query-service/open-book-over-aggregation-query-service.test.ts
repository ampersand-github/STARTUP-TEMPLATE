import { PrismaService } from '../prisma/prisma.service';
import { truncateAllTable } from '../__shared__/truncate-all-table';
import { OpenBookOAQS } from './open-book-over-aggregation-query-service';
import {
  initOpenBookOAQS,
  openBookOAQSEFindManyExpected,
  openBookOAQSEFindOneExpected,
  openBookOAQSFindAllExpected,
} from './open-book-over-aggregation-query-service-test-data';
import { OpenBookId } from '../../domain/open-book/open-book-id/open-book-id';

describe('OpenBookOAQS', () => {
  const prismaService = new PrismaService();
  const openBookOAQS = new OpenBookOAQS(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findAll()', () => {
    test('全件習得できる', async () => {
      await initOpenBookOAQS(prismaService);
      const actual = await openBookOAQS.findAll();
      expect(actual).toStrictEqual(
        expect.arrayContaining(openBookOAQSFindAllExpected),
      );
    });
    test('0件の習得できる', async () => {
      const actual = await openBookOAQS.findAll();
      expect(actual).toStrictEqual([]);
    });
  });

  describe('findMany()', () => {
    test('2件習得できる', async () => {
      await initOpenBookOAQS(prismaService);
      const id1 = OpenBookId.reBuild('2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1');
      const id2 = OpenBookId.reBuild('69edc230-103f-6c38-7665-1a0616053a23');
      const actual = await openBookOAQS.findMany([id1, id2]);
      expect(actual).toStrictEqual(
        expect.arrayContaining(openBookOAQSEFindManyExpected),
      );
    });
    test('0件習得できる', async () => {
      await initOpenBookOAQS(prismaService);
      const openBookId = OpenBookId.reBuild('sss');
      const actual = await openBookOAQS.findMany([openBookId]);
      expect(actual).toStrictEqual([]);
    });
  });

  describe('findOne()', () => {
    test('1件習得できる', async () => {
      await initOpenBookOAQS(prismaService);
      const openBookId = OpenBookId.reBuild(
        '2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1',
      );
      const actual = await openBookOAQS.findOne(openBookId);
      expect(actual).toStrictEqual(openBookOAQSEFindOneExpected);
    });
    test('0件なのでnullが変える', async () => {
      await initOpenBookOAQS(prismaService);
      const openBookId = OpenBookId.reBuild('aaa');
      const actual = await openBookOAQS.findOne(openBookId);
      expect(actual).toStrictEqual(null);
    });
  });
});
