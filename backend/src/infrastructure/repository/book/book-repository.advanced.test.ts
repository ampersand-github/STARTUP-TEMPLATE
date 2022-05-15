import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BookId } from 'src/domain/book/book-id/book-id';
import { Book, IBook } from 'src/domain/book/book';
import { TAG, Tag } from 'src/domain/book/tag/tag';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import { Borrow } from 'src/domain/book/borrow/borrow';
import { UserId } from 'src/domain/user/user-id/user-id';

// より詳細にテストや動作確認するために作成した

describe('bookRepository(advanced)', () => {
  const prismaService = new PrismaService();
  const bookRepository = new BookRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('register', () => {
    test('登録できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      // テストで使用するデータ
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const baseBookId = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const baseUserId = UserId.reBuild('25344cca-440f-3ef9-3c83-ab8f9b1b784f');
      const ops = new Tag({ name: TAG.ops });
      const go = new Tag({ name: TAG.go });
      const baseProps: IBook = {
        name: 'セキュア・バイ・デザイン',
        tagList: new TagList({ tagsList: [go, ops] }),
        author: 'author1',
        isLost: false,
        isPrivate: false,
        latestBorrow: new Borrow({
          bookId: baseBookId,
          userId: baseUserId,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: undefined,
        }),
      };
      const book1 = Book.reBuild(baseProps, baseBookId);

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      // データの登録
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      await prismaService.users.create({
        data: {
          id: baseUserId.toString(),
          name: '',
        },
      });
      await bookRepository.register(book1);

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await prismaService.books.findUnique({
        where: { id: book1.id.toString() },
        include: {
          tags: true,
          borrow_histories: true,
        },
      });

      expect(actual).toStrictEqual({
        id: book1.id.toString(),
        name: book1.getName(),
        author: book1.getAuthor(),
        is_losting: book1.getIsLost(),
        is_privates: book1.getIsPrivate(),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        tags: [
          {
            book_id: book1.id.toString(),
            tag_name: book1.getTagList().getCollection()[0].getValue(),
          },
          {
            book_id: book1.id.toString(),
            tag_name: book1.getTagList().getCollection()[1].getValue(),
          },
        ],
        borrow_histories: [
          {
            book_id: book1.id.toString(),
            user_id: baseUserId.toString(),
            start_at: book1.getLatestBorrow().getStartAt(),
            end_at: null,
          },
        ],
      });
    });
  });
});
