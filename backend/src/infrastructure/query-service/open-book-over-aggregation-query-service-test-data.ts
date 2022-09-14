import { PrismaService } from '../prisma/prisma.service';
import { IOpenBookOA } from 'src/usecase/open-book-over-aggregation/__interface__/open-book-OA-interface';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { Book } from 'src/domain/book/book';
import { Borrow } from 'src/domain/book/borrower/_borrow/borrow';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookId } from 'src/domain/book/book-id/book-id';
import { BorrowerId } from 'src/domain/book/borrower/borrower-id/borrow-id';
import { UserId } from 'src/domain/user/user-id/user-id';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const userId1 = '92fd2abe-5b68-12ec-1fec-10138bb40c62';
const openBookId1 = '2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1';
const bookId1 = '2422c514-4b06-aced-5ef3-3f869d299bd8';
const borrowId1 = '48d76298-2149-e236-15cc-8d656bc642e9';

const userId2 = '1685bb25-fbc7-5a42-48ce-2bd22038178c';
const openBookId2 = '69edc230-103f-6c38-7665-1a0616053a23';
const bookId2 = '02024ca3-8051-8011-2b1e-53dfe6275b9f';
const borrowId2 = 'aa81c1de-36d6-beda-f38f-52a3d2a006d4';

const userId3 = 'f3accf91-e7b1-29e0-2c83-30d2aba90751';
const openBookId3 = '9bbd10c1-7939-e2a7-1c90-666258565708';
const bookId3 = 'z8159404-e8dc-9319-85eb-6a56fbc9223a';
// const borrowId3 = 'eac4b860-6a37-b102-170c-2e0b9841b7c2';

const userId4 = 'dad92cc8-881c-5c74-1c36-d5d4f46f0168';
// const openBookId4 = 'ca23df00-dd52-ebb8-0bc9-649d8d07d027';
const bookId4 = 'fdfeb125-b532-4a9e-74fa-5145fb37642a';
// const borrowId4 = '8864f642-4c39-ab9a-72c6-880f72d75344';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const initOpenBookOAQS = async (prismaService: PrismaService) => {
  await prismaService.users.createMany({
    data: [
      { id: userId1, name: 'user1' },
      { id: userId2, name: 'user2' },
      { id: userId3, name: 'user3' },
      { id: userId4, name: 'user4' },
    ],
  });

  await prismaService.books.createMany({
    data: [
      { id: bookId1, name: 'name1', author: 'author1' },
      { id: bookId2, name: 'name2', author: 'author2' },
      { id: bookId3, name: 'name3', author: 'author3' },
      { id: bookId4, name: 'name4', author: 'author4' },
    ],
  });

  await prismaService.open_books.createMany({
    data: [
      { id: openBookId1, book_id: bookId1, borrow_histories_id: null },
      { id: openBookId2, book_id: bookId2, borrow_histories_id: null },
      { id: openBookId3, book_id: bookId3, borrow_histories_id: null },
      // { id: openBookId4, book_id: bookId4, borrow_histories_id: null },
    ],
  });

  await prismaService.borrow_histories.createMany({
    data: [
      {
        id: borrowId1,
        open_book_id: openBookId1,
        user_id: userId1,
        start_at: new Date('2022-05-26T10:43:22.960Z'),
        end_at: null,
      },
      {
        id: borrowId2,
        open_book_id: openBookId2,
        user_id: userId2,
        start_at: new Date('2022-05-26T10:43:22.960Z'),
        end_at: new Date('2022-05-26T10:43:22.960Z'),
      },
    ],
  });

  await prismaService.open_books.update({
    where: { id: openBookId1 },
    data: {
      borrow_histories_id: borrowId1,
    },
  });

  await prismaService.open_books.update({
    where: { id: openBookId2 },
    data: {
      borrow_histories_id: borrowId2,
    },
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// expected
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const expected1: IOpenBookOA = {
  id: OpenBookId.reBuild(openBookId1),
  book: Book.reBuild(
    {
      name: 'name1',
      author: 'author1',
      tagList: new TagList({ tagsList: [] }),
    },
    BookId.reBuild(bookId1),
  ),
  borrowing: Borrow.reBuild(
    {
      openBookId: OpenBookId.reBuild(openBookId1),
      userId: UserId.reBuild(userId1),
      startAt: new Date('2022-05-26T10:43:22.960Z'),
      endAt: undefined,
    },
    BorrowerId.reBuild(borrowId1),
  ),
};

const expected2: IOpenBookOA = {
  id: OpenBookId.reBuild(openBookId2),
  book: Book.reBuild(
    {
      name: 'name2',
      author: 'author2',
      tagList: new TagList({ tagsList: [] }),
    },
    BookId.reBuild(bookId2),
  ),
  borrowing: Borrow.reBuild(
    {
      openBookId: OpenBookId.reBuild(openBookId2),
      userId: UserId.reBuild(userId2),
      startAt: new Date('2022-05-26T10:43:22.960Z'),
      endAt: new Date('2022-05-26T10:43:22.960Z'),
    },
    BorrowerId.reBuild(borrowId2),
  ),
};

const expected3: IOpenBookOA = {
  id: OpenBookId.reBuild(openBookId3),
  book: Book.reBuild(
    {
      name: 'name3',
      author: 'author3',
      tagList: new TagList({ tagsList: [] }),
    },
    BookId.reBuild(bookId3),
  ),
  borrowing: undefined,
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const openBookOAQSFindAllExpected: IOpenBookOA[] = [
  expected1,
  expected2,
  expected3,
];
export const openBookOAQSEFindManyExpected = [expected1];
export const openBookOAQSEFindOneExpected = expected1;
