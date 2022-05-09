import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BookId } from 'src/domain/book/book-id';
import { Book, IBook } from 'src/domain/book/book';
import { TAG, Tag } from 'src/domain/book/tag';
import { TagList } from 'src/domain/book/tag-list';
import { BookRepository } from 'src/infrastructure/repository/book-repository';

describe('bookRepository', () => {
  const prismaService = new PrismaService();
  const bookRepository = new BookRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('findAll', () => {
    test('データが１件もない', async () => {
      const result = await bookRepository.findAll();
      expect(result).toEqual([]);
    });
    test('正常に全件取得できる', async () => {
      await prismaService.books.createMany({
        data: [insertBook1, insertBook2, insertBook3, insertBook4],
      });
      await prismaService.tags.createMany({
        data: [
          insertTag1,
          insertTag2,
          insertTag3,
          insertTag4,
          insertTag5,
          insertTag6,
          insertTag7,
        ],
      });
      const actual = await bookRepository.findAll();
      expect(actual).toEqual([book1, book2, book3, book4]);
    });
  });

  describe('findOne', () => {
    test('データが１件もない', async () => {
      const bookId = BookId.reBuild('aaa');
      const result = await bookRepository.findOne(bookId);
      expect(result).toEqual(null);
    });
    test('データが合致する', async () => {
      await prismaService.books.createMany({ data: [insertBook1] });
      await prismaService.tags.createMany({ data: [insertTag1, insertTag2] });
      const result = await bookRepository.findOne(bookId1);
      expect(result).toEqual(book1);
      expect(result.equals(book1)).toBe(true);
    });
  });
});
// - - - - - 以下、テストで使用するデータ - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - -
// TAG
// - - - - - - - - - - - - - - - - - - - - - - - - -
const tech = new Tag({ name: TAG.tech });
const novel = new Tag({ name: TAG.novel });
const picture = new Tag({ name: TAG.picture });
const bigSize = new Tag({ name: TAG.bigSize });
const newBookSize = new Tag({ name: TAG.newBookSize });

// - - - - - - - - - - - - - - - - - - - - - - - - -
// BOOK
// - - - - - - - - - - - - - - - - - - - - - - - - -
const bookId1 = BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
const tagList1 = new TagList({ tags: [tech, bigSize] });
const props1: IBook = {
  name: 'セキュア・バイ・デザイン',
  tagList: tagList1,
  author: 'author1',
  rating: 1,
};
const book1 = Book.reBuild(props1, bookId1);
//
const bookId2 = BookId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
const tagList2 = new TagList({ tags: [tech] });
const props2: IBook = {
  name: '監視入門',
  tagList: tagList2,
  author: 'author2',
  rating: 2,
};
const book2 = Book.reBuild(props2, bookId2);
//
const bookId3 = BookId.reBuild('6c2faf45-8fae-48ad-e660-c5d1c92920c2');
const tagList3 = new TagList({ tags: [novel, newBookSize] });
const props3: IBook = {
  name: '三体',
  tagList: tagList3,
  author: 'author3',
  rating: 3,
};
const book3 = Book.reBuild(props3, bookId3);

//
const bookId4 = BookId.reBuild('ab442d20-5e7a-2058-5a93-48bb1e4fe4ab');
const tagList4 = new TagList({ tags: [bigSize, picture] });
const props4: IBook = {
  name: 'よく分かる恐竜図鑑',
  tagList: tagList4,
  author: 'author4',
  rating: 4,
};
const book4 = Book.reBuild(props4, bookId4);

// - - - - - - - - - - - - - - - - - - - - - - - - -
// prismaテスト投入データ
// - - - - - - - - - - - - - - - - - - - - - - - - -
const insertBook1 = {
  id: book1.id.toString(),
  name: book1.name,
  author:book1.author,
  rating:book1.rating
};
const insertBook2 = {
  id: book2.id.toString(),
  name: book2.name,
  author:book2.author,
  rating:book2.rating
};
const insertBook3 = {
  id: book3.id.toString(),
  name: book3.name,
  author:book3.author,
  rating:book3.rating
};
const insertBook4 = {
  id: book4.id.toString(),
  name: book4.name,
  author:book4.author,
  rating:book4.rating
};

const insertTag1 = {
  book_id: insertBook1.id.toString(),
  tag_name: tech.value,
};
const insertTag2 = {
  book_id: insertBook1.id.toString(),
  tag_name: bigSize.value,
};
const insertTag3 = {
  book_id: insertBook2.id.toString(),
  tag_name: tech.value,
};

const insertTag4 = {
  book_id: insertBook3.id.toString(),
  tag_name: novel.value,
};
const insertTag5 = {
  book_id: insertBook3.id.toString(),
  tag_name: newBookSize.value,
};
const insertTag6 = {
  book_id: insertBook4.id.toString(),
  tag_name: bigSize.value,
};
const insertTag7 = {
  book_id: insertBook4.id.toString(),
  tag_name: picture.value,
};
