import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { BorrowRepository, IPrismaBorrow } from './borrow-repository';
import { Borrow, IBorrow } from '../../../domain/borrow/borrow';
import { UserId } from '../../../domain/user/user-id/user-id';
import { BookId } from '../../../domain/book/book-id/book-id';
import { BorrowId } from '../../../domain/borrow/borrow-id/borrow-id';
import { User } from '../../../domain/user/user';
import { OpenBookId } from '../../../domain/open-book/open-book-id/open-book-id';

describe('BorrowRepository', () => {
  const prismaService = new PrismaService();
  const borrowRepository = new BorrowRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findAll()', () => {
    test('', async () => {});
  });

  describe('findAllByBookId()', () => {
    test('', async () => {});
  });

  describe('findAllByUserId()', () => {
    test('', async () => {});
  });

  describe('save()/findOne()', () => {
    test('習得できる', async () => {
      const borrowId = BorrowId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const userId = UserId.reBuild('8e37f697-581a-3486-bb79-80348c153828');
      const bookId = OpenBookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580');

      const borrow: Borrow = Borrow.reBuild(
        {
          userId: userId,
          openBookId: bookId,
          startAt: new Date(),
          endAt: undefined,
        },
        borrowId,
      );

      await prismaService.users.create({
        data: { id: userId.toString(), name: 'name1' },
      });
      await prismaService.books.create({
        data: {
          id: bookId.toString(),
          name: 'name1',
          author: 'author1',
        },
      });
      await borrowRepository.save(borrow);
      const actual = await borrowRepository.findOne(borrowId);
      expect(actual).toStrictEqual(borrow);
    });
    test('値がないのは習得できない', async () => {
      const borrowId = BorrowId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const actual = await borrowRepository.findOne(borrowId);
      expect(actual).toStrictEqual(null);
    });
  });
});
