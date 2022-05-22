import { PrismaService } from '../prisma/prisma.service';
import { BookWithBorrowQS } from './book-with-borrow-query-service';
import { truncateAllTable } from '../__shared__/truncate-all-table';
import {
  expected_BookWithBorrow_findAll_1,
  expected_BookWithBorrow_findAll_2,
  expected_BookWithBorrow_findOne_1,
  expected_BookWithBorrow_findOne_2,
  init_BookWithBorrow_findAll,
  init_BookWithBorrow_findAll_2,
  init_BookWithBorrow_findOne_1,
  init_BookWithBorrow_findOne_2,
} from './book-with-borrow-query-service-test-data';

describe('BookWithBorrowQS', () => {
  const prismaService = new PrismaService();
  const bookWithBorrowQS = new BookWithBorrowQS(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findAll()', () => {
    test('1貸出実績あり', async () => {
      await init_BookWithBorrow_findAll(prismaService);
      const actual = await bookWithBorrowQS.findAll();
      expect(actual).toStrictEqual(expected_BookWithBorrow_findAll_1());
    });
    test('2貸出実績なし', async () => {
      await init_BookWithBorrow_findAll_2(prismaService);
      const actual = await bookWithBorrowQS.findAll();
      expect(actual).toStrictEqual(expected_BookWithBorrow_findAll_2());
    });
  });

  describe('findOne()', () => {
    test('1貸出実績あり', async () => {
      await init_BookWithBorrow_findOne_1(prismaService);
      const actual = await bookWithBorrowQS.findAll();
      expect(actual).toStrictEqual(expected_BookWithBorrow_findOne_1());
    });
    test('2貸出実績なし', async () => {
      await init_BookWithBorrow_findOne_2(prismaService);
      const actual = await bookWithBorrowQS.findAll();
      expect(actual).toStrictEqual(expected_BookWithBorrow_findOne_2());
    });
  });
});
