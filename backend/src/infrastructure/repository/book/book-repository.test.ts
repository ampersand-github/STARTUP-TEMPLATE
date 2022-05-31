import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import {
  baseBook,
  baseBookUpdate,
  WithTagBook,
  WithTagBookUpdate,
  zeroTagBook,
} from './book-repository-test-data';

describe('bookRepository', () => {
  const prismaService = new PrismaService();
  const bookRepository = new BookRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findOne()/save()', () => {
    test('新しい書籍を登録できる', async () => {
      await bookRepository.save(baseBook);
      const actual = await bookRepository.findOne(baseBook.id);
      expect(actual).toStrictEqual(baseBook);
    });
    test('書籍の情報を更新できる', async () => {
      await bookRepository.save(baseBook); // 更新元
      await bookRepository.save(baseBookUpdate); // 更新後
      expect(await prismaService.books.count()).toStrictEqual(1);
      const actual = await bookRepository.findOne(baseBookUpdate.id);
      expect(actual).toStrictEqual(baseBookUpdate);
      expect(actual).not.toEqual(baseBook); // 更新された情報は習得できない
    });
    test('タグ情報が0件でも登録できる', async () => {
      await bookRepository.save(zeroTagBook);
      const actual = await bookRepository.findOne(zeroTagBook.id);
      expect(actual).toStrictEqual(zeroTagBook);
      expect(await prismaService.tags.count()).toStrictEqual(0);
    });
    test('タグ情報を更新できる(delete/insert)', async () => {
      // 更新時に関係ないデータまで消していないか確認するためのデータ
      await bookRepository.save(baseBook);
      // 元データ
      await bookRepository.save(WithTagBook);
      // 更新データ
      await bookRepository.save(WithTagBookUpdate);
      // データが更新されていることを確認する
      const actual = await bookRepository.findOne(WithTagBookUpdate.id);
      expect(actual).toStrictEqual(WithTagBookUpdate);
      // 更新前のデータを習得できない
      expect(actual).not.toEqual(WithTagBook);
      // 関係ないデータを更新していない
      expect(await bookRepository.findOne(baseBook.id)).toStrictEqual(baseBook);
    });
  });
});
