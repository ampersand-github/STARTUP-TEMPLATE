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
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findOne', () => {
    test('データが１件もない', async () => {
      const bookId = BookId.reBuild('aaa');
      const result = await bookRepository.findOne(bookId);
      expect(result).toEqual(null);
    });

    test('データが合致する', async () => {
      //  ■ データ生成
      await createPrismaUser1(prismaService)
      // 本来であればテスト内容が重複してしまうため良くないやり方だが、prisma.book.create()をすると記述量が膨大になるのでやらない
      await bookRepository.register(book1);
      //  ■ テスト
      const result = await bookRepository.findOne(book1.id);
      expect(result).toStrictEqual(book1);
    });

    test('データが合致する/タグがない', async () => {
      await bookRepository.register(book2);
      const result = await bookRepository.findOne(book2.id);
      expect(result).toStrictEqual(book2);
      expect(result.getTagList().getCollection()).toStrictEqual([]);
    });

    test('データが合致する/紛失中、非公開', async () => {
      await bookRepository.register(book3);
      const result = await bookRepository.findOne(book3.id);
      expect(result).toStrictEqual(book3);
      expect(result.getIsPrivate()).toStrictEqual(true);
      expect(result.getIsLost()).toStrictEqual(true);
    });
  });

  describe('findAll', () => {
    test('データが１件もない', async () => {
      const result = await bookRepository.findAll();
      expect(result).toEqual([]);
    });
    test('正常に全件取得できる', async () => {
      //  ■ データ生成
      await createPrismaUser1(prismaService)
      await bookRepository.register(book1);
      await bookRepository.register(book2);
      await bookRepository.register(book3);
      await bookRepository.register(book4);
      //  ■ テスト
      const actual = await bookRepository.findAll();
      expect(actual).toStrictEqual([book1, book2, book3, book4]);
    });
  });

  describe('register', () => {
    test('登録できる', async () => {
      //  ■ データ生成
      await createPrismaUser1(prismaService)
      await bookRepository.register(book1);
      //  ■ テスト
      const actual = await prismaService.books.findUnique({
        where: { id: book1.id.toString() },
        include: {
          tags: true,
          borrow_histories: true,
        },
      });
      expect(actual).toStrictEqual(boo1ResisterData);
    });
  });

  describe('update', () => {
   test('更新できる', async () => {
     await createPrismaUser1(prismaService)
     await bookRepository.register(book1);
     // 間違って消していないことを確認するために登録
     await bookRepository.register(book2);
     await bookRepository.update(book1Updated)
     const remainBook2 = await bookRepository.findOne(book2.id)
     //
     const actual =await bookRepository.findOne(book1.id)
     expect(actual).toStrictEqual(book1Updated);
     expect(remainBook2).toStrictEqual(book2)

   });
  });
});
// - - - - - - - - - - - - - - - - - - - - - - - - -
// TAG
// - - - - - - - - - - - - - - - - - - - - - - - - -
const ops = new Tag({ name: TAG.ops });
const ui = new Tag({ name: TAG.ui });
const design = new Tag({ name: TAG.design });
const go = new Tag({ name: TAG.go });
const attitude = new Tag({ name: TAG.attitude });

// - - - - - - - - - - - - - - - - - - - - - - - - -
// USER-ID
// - - - - - - - - - - - - - - - - - - - - - - - - -
const userId1 = UserId.reBuild('25344cca-440f-3ef9-3c83-ab8f9b1b784f');

const createPrismaUser1 = async (prismaService:PrismaService) => {
  await prismaService.users.create({
    data: {
      id: userId1.toString(),
      name: '',
    },
  });
}
// - - - - - - - - - - - - - - - - - - - - - - - - -
// BOOK
// - - - - - - - - - - - - - - - - - - - - - - - - -
const bookId1 = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
const props1: IBook = {
  name: 'セキュア・バイ・デザイン',
  tagList: new TagList({ tagsList: [go, ops] }),
  author: 'author1',
  isLost: true,
  isPrivate: false,
  latestBorrow: new Borrow({
    bookId: bookId1,
    userId: userId1,
    startAt: new Date('2022-05-14T12:31:02.522Z'),
    endAt: undefined,
  }),
};

const props1Updated: IBook = {
  name: 'セキュア・バイ・デザインupdated',
  tagList: new TagList({ tagsList: [ops,ui] }),
  author: 'author1-updated',
  isLost: false,
  isPrivate: true,
  latestBorrow: new Borrow({
    bookId: bookId1,
    userId: userId1,
    startAt: new Date('2022-05-14T12:31:02.522Z'),
    endAt: new Date('2022-05-30T12:31:02.522Z'),
  }),
};
const book1 = Book.reBuild(props1, bookId1);
const book1Updated = Book.reBuild(props1Updated, bookId1);

// タグなし
const bookId2 = BookId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
const props2: IBook = {
  name: '監視入門',
  tagList: new TagList({ tagsList: [] }),
  author: 'author2',
  isLost: false,
  isPrivate: false,
  latestBorrow: undefined,
};
const book2 = Book.reBuild(props2, bookId2);

// 紛失中かつ非公開
const bookId3 = BookId.reBuild('6c2faf45-8fae-48ad-e660-c5d1c92920c2');
const props3: IBook = {
  name: '三体',
  tagList: new TagList({ tagsList: [ui, attitude] }),
  author: 'author3',
  isLost: true,
  isPrivate: true,
  latestBorrow: undefined,
};
const book3 = Book.reBuild(props3, bookId3);

const bookId4 = BookId.reBuild('ab442d20-5e7a-2058-5a93-48bb1e4fe4ab');
const tagList4 = new TagList({ tagsList: [go, design] });
const props4: IBook = {
  name: 'よく分かる恐竜図鑑',
  tagList: tagList4,
  author: 'author4',
  isLost: false,
  isPrivate: true,
  latestBorrow: undefined,
};
const book4 = Book.reBuild(props4, bookId4);

// - - - - - - - - - - - - - - - - - - - - - - - - -
// 登録データ
// - - - - - - - - - - - - - - - - - - - - - - - - -
const boo1ResisterData = {
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
      user_id: userId1.toString(),
      start_at: book1.getLatestBorrow().getStartAt(),
      end_at: null,
    },
  ],
};
