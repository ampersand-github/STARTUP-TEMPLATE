import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BookId } from 'src/domain/book/book-id/book-id';
import { Book, IBook } from 'src/domain/book/book';
import { TAG, Tag } from 'src/domain/book/tag/tag';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import { Borrow } from '../../../domain/book/borrow/borrow';
import { UserId } from '../../../domain/user/user-id/user-id';

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
      await prismaService.users.create({
        data: {
          id: userId1.toString(),
          name: '',
        },
      });
      await bookRepository.register(book2);
      const result = await bookRepository.findOne(book2.id);
      expect(result).toStrictEqual(book2);
    });
  });

  describe('findAll', () => {
    test('データが１件もない', async () => {
      const result = await bookRepository.findAll();
      expect(result).toEqual([]);
    });
    test('正常に全件取得できる', async () => {
      await prismaService.users.create({
        data: {
          id: userId1.toString(),
          name: '',
        },
      });
      await bookRepository.register(book1);
      await bookRepository.register(book2);
      await bookRepository.register(book3);
      await bookRepository.register(book4);
      const actual = await bookRepository.findAll();
      expect(actual).toStrictEqual([book1, book2, book3, book4]);
    });
  });

  describe('register', () => {
    test('a', async () => {
      await prismaService.users.create({
        data: {
          id: userId1.toString(),
          name: '',
        },
      });
      await bookRepository.register(book1);
      const actual = await prismaService.books.findUnique({
        where: { id: book1.id.toString() },
        include: {
          tags: true,
          lostings: true,
          privates: true,
          borrow_histories: true,
        },
      });
      console.log(actual);
      expect(actual).toEqual({
        id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
        name: 'セキュア・バイ・デザイン',
        author: 'author1',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        tags: [
          {
            book_id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
            tag_name: '運用',
          },
          {
            book_id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
            tag_name: 'Go',
          },
        ],
        privates: null,
        lostings: {
          book_id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
        },
        borrow_histories: [
          {
            book_id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
            user_id: '25344cca-440f-3ef9-3c83-ab8f9b1b784f',
            start_at: new Date('2022-05-14T12:31:02.522Z'),
            end_at: null,
          },
        ],
      });
    });
  });
});
// - - - - - 以下、テストで使用するデータ - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - -
// TAG
// - - - - - - - - - - - - - - - - - - - - - - - - -
const ops = new Tag({ name: TAG.ops });
const ui = new Tag({ name: TAG.ui });
const design = new Tag({ name: TAG.design });
const go = new Tag({ name: TAG.go });
const attitude = new Tag({ name: TAG.attitude });

// - - - - - - - - - - - - - - - - - - - - - - - - -
// BOOK
// - - - - - - - - - - - - - - - - - - - - - - - - -
const bookId1 = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
const userId1 = UserId.reBuild('25344cca-440f-3ef9-3c83-ab8f9b1b784f');
const props1: IBook = {
  name: 'セキュア・バイ・デザイン',
  tagList: new TagList({ tagsList: [ops, go] }),
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
const book1 = Book.reBuild(props1, bookId1);

const bookId2 = BookId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
const tagList2 = new TagList({ tagsList: [ops] });
const props2: IBook = {
  name: '監視入門',
  tagList: tagList2,
  author: 'author2',
  isLost: false,
  isPrivate: false,
  latestBorrow: undefined,
};
const book2 = Book.reBuild(props2, bookId2);
//
const bookId3 = BookId.reBuild('6c2faf45-8fae-48ad-e660-c5d1c92920c2');
const tagList3 = new TagList({ tagsList: [ui, attitude] });
const props3: IBook = {
  name: '三体',
  tagList: tagList3,
  author: 'author3',
  isLost: false,
  isPrivate: false,
  latestBorrow: undefined,
};
const book3 = Book.reBuild(props3, bookId3);

//
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
