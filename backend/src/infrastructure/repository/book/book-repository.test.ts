import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BookId } from 'src/domain/book/book-id/book-id';
import { Book, IBook } from 'src/domain/book/book';
import { TAG, Tag } from 'src/domain/book/tag/tag';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import { UserId } from 'src/domain/user/user-id/user-id';
import { Borrow, IBorrow } from '../../../domain/user/borrow/borrow';
import { BorrowId } from '../../../domain/user/borrow/borrow-id';
import {firstBook, firstBookUpdate} from "./book-repository.data";

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
      await bookRepository.save(firstBook)
      const actual = await bookRepository.findOne(firstBook.id)
      expect(actual).toStrictEqual(firstBook);
    });
    test('書籍の情報を更新できる', async () => {
      await bookRepository.save(firstBookUpdate)
      const actual = await bookRepository.findOne(firstBookUpdate.id)
      expect(actual).toStrictEqual(firstBookUpdate);
      expect(actual).not.toEqual(firstBook)
    });
    test('タグ情報が0件でも登録できる', async () => {});
    test('タグ情報を更新できる(delete/insert)', async () => {
      // 別の書籍のタグ情報を消してないことを確認
    });
    test('一度も貸し出したことのない書籍を習得できる', async () => {
      // undefinedになる
    });
    test('貸出履歴が存在し、その最新の貸出履歴のendAtに値が入っている', async () => {});
    test('貸出履歴が存在し、その最新の貸出履歴のendAtがnullである', async () => {});
    test('貸出履歴を更新することはできない(userリポジトリの情報なので)', async () => {});
  });

  describe('findAll()', () => {
    test('１件もない場合は空配列を取得する', async () => {
      const result = await bookRepository.findAll();
      expect(result).toEqual([]);
    });
    test('全件を習得できる', async () => {});
  });
});

/*
    describe('練習', () => {
    test('練習', async () => {
      // テストの意図を書く
      // null値あり、最新引っ張るみたいなかんじで。
      // テストデータを別ファイルへ寄せても良いかも
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const book = Book.reBuild(baseBookProps, bookId);
      await bookRepository.register(book);
      //
      await prismaService.borrow_histories.create({
        data: {
          id: '0a520a59-b8ae-ec69-32b1-7c46efbe44e5',
          book_id: bookId.toString(),
          user_id: userId1.toString(),
          start_at: new Date('2022-05-10T15:19:44.125Z'),
          end_at: new Date('2022-05-11T15:19:44.125Z'),
        },
      });
      await prismaService.borrow_histories.create({
        data: {
          id: '0a520a59-b8ae-ec69-32b1-7c46efbe44e6',
          book_id: bookId.toString(),
          user_id: userId1.toString(),
          start_at: new Date('2022-05-12T15:19:44.125Z'),
          end_at: new Date('2022-05-13T15:19:44.125Z'),
        },
      });
      await prismaService.borrow_histories.create({
        data: {
          id: '0a520a59-b8ae-ec69-32b1-7c46efbe44e7',
          book_id: bookId.toString(),
          user_id: userId1.toString(),
          start_at: new Date('2022-05-14T15:19:44.125Z'),
          end_at: null,
        },
      });
      //
      await bookRepository['getLatestBorrow'](bookId.toString());
      console.log(await bookRepository.findAll());
    });
  });

  describe('register/findOne', () => {
    test('最小限の書籍データを登録できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const book = Book.reBuild(baseBookProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(bookId);
      expect(actual).toStrictEqual(book);
    });

    test('タグのある書籍データを登録できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const withTagProps = {
        ...baseBookProps,
        tagList: new TagList({ tagsList: [go, ops] }),
      };
      const book = Book.reBuild(withTagProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(bookId);
      expect(actual).toStrictEqual(book);
    });

    test('紛失中、非公開の書籍データを登録できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const withLostAndPrivateProps = {
        ...baseBookProps,
        isLost: true,
        isPrivate: true,
      };
      const book = Book.reBuild(withLostAndPrivateProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(bookId);
      expect(actual).toStrictEqual(book);
    });

    test('最新の貸出履歴のあるデータを習得できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const borrowId = BorrowId.reBuild('a48dcd33-1638-48bd-f6fe-07a4ab50f45d');
      const latestBorrowProps: IBorrow = {
        userId: userId1,
        bookId: bookId,
        startAt: new Date('2022-05-15T13:55:03.232Z'),
        endAt: new Date('2022-05-16T13:55:03.232Z'),
      };
      const borrow = LatestBorrow.reBuild(latestBorrowProps, borrowId);

      const withLatestBorrowProps: IBook = {
        ...baseBookProps,
        isBorrowing: false,
      };
      const book = Book.reBuild(withLatestBorrowProps, bookId);
      await bookRepository.register(book);
      await prismaService.borrow_histories.create({
        data: {
          id: borrowId.toString(),
          book_id: latestBorrowProps.bookId.toString(),
          user_id: latestBorrowProps.userId.toString(),
          start_at: latestBorrowProps.startAt,
          end_at: latestBorrowProps.endAt,
        },
      });
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(bookId);
      expect(actual).toStrictEqual(book);
    });
  });
  describe('findAll', () => {
    test('データが１件もない', async () => {
      const result = await bookRepository.findAll();
      expect(result).toEqual([]);
    });
    test('正常に全件取得できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId1 = BookId.reBuild('a38da2c1-051f-e126-441d-0b091d04f12d');
      const bookId2 = BookId.reBuild('7ce4e7da-746b-0653-5985-61942e473cab');
      const bookId3 = BookId.reBuild('dc789002-f0df-fcf3-94c9-d1e9c670a1b4');
      const book1 = Book.reBuild(baseBookProps, bookId1);
      const book2 = Book.reBuild(baseBookProps, bookId2);
      const book3 = Book.reBuild(baseBookProps, bookId3);
      await bookRepository.register(book1);
      await bookRepository.register(book2);
      await bookRepository.register(book3);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findAll();
      expect(actual).toStrictEqual([book1, book2, book3]);
    });
  });

  describe('update', () => {
    test('bookを更新できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const book = Book.reBuild(baseBookProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const updateProps: IBook = {
        ...baseBookProps,
        name: 'updatedName',
        author: 'updateAuthor',
        isPrivate: true,
        isLost: true,
      };
      const updateBook = Book.reBuild(updateProps, bookId);
      await bookRepository.update(updateBook);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(book.id);
      expect(actual).not.toStrictEqual(book);
      expect(actual).toStrictEqual(updateBook);
    });

    test('タグを更新(追加、削除)できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const withTagProps = {
        ...baseBookProps,
        tagList: new TagList({ tagsList: [go, ops] }),
      };
      const book = Book.reBuild(withTagProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const updateTagProps = {
        ...baseBookProps,
        tagList: new TagList({ tagsList: [go, ui] }),
      };
      const updateBook = Book.reBuild(updateTagProps, bookId);
      await bookRepository.update(updateBook);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(book.id);
      expect(actual).not.toStrictEqual(book);
      expect(actual).toStrictEqual(updateBook);
    });
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// テストで使用するデータ
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ops = new Tag({ name: TAG.ops });
const go = new Tag({ name: TAG.go });
const ui = new Tag({ name: TAG.ui });
// USER-ID
const userId1 = UserId.reBuild('25344cca-440f-3ef9-3c83-ab8f9b1b784f');

// BOOK
const baseBookProps: IBook = {
  name: 'セキュア・バイ・デザイン',
  tagList: new TagList({ tagsList: [] }),
  author: 'author1',
  isLost: false,
  isPrivate: false,
  isBorrowing: false,
};

   */
