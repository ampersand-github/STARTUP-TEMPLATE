import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { OpenBookRepository } from './open-book-repository';
import {
  initOpenBookRepository1,
  initOpenBookRepository2,
  newOpenBook,
  updateOpenBook,
} from './book-repository-test-data';

describe('bookRepository', () => {
  const prismaService = new PrismaService();
  const openBookR = new OpenBookRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('isBookExist', () => {
    test('書籍が存在しないのでエラーを発する', async () => {
      const actual = async () => await openBookR['isBookExist']('');
      await expect(actual).rejects.toThrowError('書籍が存在していません');
    });
  });

  describe('isBorrowExist', () => {
    test('貸出が存在しないのでエラーを発する', async () => {
      const actual = async () => await openBookR['isBorrowExist']('');
      await expect(actual).rejects.toThrowError('貸出情報が存在していません');
    });
  });

  describe('findOne()/save()', () => {
    test('新しい公開書籍を登録できる', async () => {
      await initOpenBookRepository1(prismaService);
      await openBookR.save(newOpenBook);
      const actual = await openBookR.findOne(newOpenBook.id);
      expect(actual).toStrictEqual(newOpenBook);
    });
    test('公開書籍の情報を更新できる', async () => {
      await initOpenBookRepository2(prismaService);
      await openBookR.save(newOpenBook); // 更新元
      await openBookR.save(updateOpenBook); // 更新後
      const actual = await openBookR.findOne(updateOpenBook.id);
      expect(actual).toStrictEqual(updateOpenBook);
      expect(actual).not.toEqual(newOpenBook); // 更新された情報は習得できない
    });
    test('公開書籍の情報を更新して貸出中IDがnullになっても参照元のデータは存在する', async () => {
      await initOpenBookRepository2(prismaService);
      await openBookR.save(newOpenBook); // 更新元
      await openBookR.save(updateOpenBook); // 更新
      await openBookR.save(newOpenBook); // 更に更新
      const actual = await openBookR.findOne(newOpenBook.id);
      expect(actual).toStrictEqual(newOpenBook);
      expect(actual).not.toEqual(updateOpenBook); // 更新された情報は習得できない
      const count = await prismaService.borrow_histories.count();
      expect(count).toStrictEqual(1);
    });
  });
});
