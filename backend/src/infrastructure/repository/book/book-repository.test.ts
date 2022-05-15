import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BookId } from 'src/domain/book/book-id/book-id';
import { Book, IBook } from 'src/domain/book/book';
import { TAG, Tag } from 'src/domain/book/tag/tag';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import { Borrow } from 'src/domain/book/borrow/borrow';
import { UserId } from 'src/domain/user/user-id/user-id';

describe('bookRepository', () => {
  const prismaService = new PrismaService();
  const bookRepository = new BookRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
    await prismaService.users.create({
      data: {
        id: userId1.toString(),
        name: '',
      },
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
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

    test('レンタル中の書籍データを登録できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('ab442d20-5e7a-2058-5a93-48bb1e4fe4ab');
      const withBorrowingProps = {
        ...baseBookProps,
        latestBorrow: new Borrow({
          bookId: bookId,
          userId: userId1,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: undefined,
        }),
      };
      const book = Book.reBuild(withBorrowingProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(bookId);
      expect(actual).toStrictEqual(book);
    });

    test('レンタルが終了した書籍データを登録できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const withBorrowProps = {
        ...baseBookProps,
        latestBorrow: new Borrow({
          bookId: bookId,
          userId: userId1,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: new Date('2022-06-15T13:31:02.522Z'),
        }),
      };
      const book = Book.reBuild(withBorrowProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(bookId);
      expect(actual).toStrictEqual(book);
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

    test('最初の一人目が書籍を借りることができる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const book = Book.reBuild(baseBookProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const firstBorrowProps = {
        ...baseBookProps,
        latestBorrow: new Borrow({
          bookId: bookId,
          userId: userId1,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: undefined,
        }),
      };
      const updateBook = Book.reBuild(firstBorrowProps, bookId);
      await bookRepository.update(updateBook);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await bookRepository.findOne(book.id);
      expect(actual).not.toStrictEqual(book);
      expect(actual).toStrictEqual(updateBook);
    });

    test('借りている書籍を返却できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const bookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const borrowingProps = {
        ...baseBookProps,
        latestBorrow: new Borrow({
          bookId: bookId,
          userId: userId1,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: undefined,
        }),
      };
      const book = Book.reBuild(borrowingProps, bookId);
      await bookRepository.register(book);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const returnProps = {
        ...baseBookProps,
        latestBorrow: new Borrow({
          bookId: borrowingProps.latestBorrow.getBookId(),
          userId: borrowingProps.latestBorrow.getUserId(),
          startAt: borrowingProps.latestBorrow.getStartAt(),
          endAt: new Date('2022-05-18T17:31:02.522Z'),
        }),
      };
      const updateBook = Book.reBuild(returnProps, bookId);
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
  latestBorrow: undefined,
};
