import { Book } from '../../domain/book/book';
import { TagList } from '../../domain/book/tag/tag-list';
import { TAG, Tag } from '../../domain/book/tag/tag';
import { BookId } from '../../domain/book/book-id/book-id';
import { PrismaService } from '../prisma/prisma.service';
import { BorrowId } from '../../domain/borrow/borrow-id/borrow-id';
import { UserId } from '../../domain/user/user-id/user-id';
import { Borrow } from '../../domain/borrow/borrow';

const userId = UserId.reBuild('8e37f697-581a-3486-bb79-80348c153828');
const bookId = BookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// findAll-1
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const init_BookWithBorrow_findAll = async (
  prismaService: PrismaService,
) => {
  await prismaService.users.create({
    data: { id: userId.toString(), name: 'name1' },
  });

  await prismaService.books.create({
    include: { tags: true },
    data: {
      id: bookId.toString(),
      name: 'name1',
      author: 'author1',
      is_losting: false,
      is_privates: false,
      tags: { create: { tag_name: TAG.ui } },
    },
  });

  await prismaService.borrow_histories.createMany({
    data: [
      {
        id: '5dea1394-ff8f-cbe0-5316-41027da0a4b4',
        book_id: bookId.toString(),
        user_id: userId.toString(),
        start_at: new Date('2022-05-10T09:25:11.847Z'),
        end_at: new Date('2022-05-11T09:25:11.847Z'),
      },
      {
        id: '73f68ce8-0215-8af5-545b-27ab47be38c1',
        book_id: bookId.toString(),
        user_id: userId.toString(),
        start_at: new Date('2022-05-18T09:25:11.847Z'),
        end_at: new Date('2022-05-19T09:25:11.847Z'),
      },
      {
        id: 'af6c06db-6e95-7503-4a04-a64fb8da735e',
        book_id: bookId.toString(),
        user_id: userId.toString(),
        start_at: new Date('2022-05-13T09:25:11.847Z'),
        end_at: new Date('2022-05-14T09:25:11.847Z'),
      },
    ],
  });
};

export const expected_BookWithBorrow_findAll_1 = () => {
  const book = Book.reBuild(
    {
      name: 'name1',
      author: 'author1',
      isLost: false,
      isPrivate: false,
      tagList: new TagList({ tagsList: [new Tag({ name: TAG.ui })] }),
    },
    BookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
  );

  const borrow = Borrow.reBuild(
    {
      bookId: bookId,
      userId: userId,
      startAt: new Date('2022-05-18T09:25:11.847Z'),
      endAt: new Date('2022-05-19T09:25:11.847Z'),
    },
    BorrowId.reBuild('73f68ce8-0215-8af5-545b-27ab47be38c1'),
  );
  return [{ book: book, borrow: borrow }];
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// findAll-2
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const init_BookWithBorrow_findAll_2 = async (
  prismaService: PrismaService,
) => {
  await prismaService.users.create({
    data: { id: userId.toString(), name: 'name1' },
  });

  await prismaService.books.create({
    include: { tags: true },
    data: {
      id: bookId.toString(),
      name: 'name1',
      author: 'author1',
      is_losting: false,
      is_privates: false,
      tags: { create: { tag_name: TAG.ui } },
    },
  });
};

export const expected_BookWithBorrow_findAll_2 = () => {
  const book = Book.reBuild(
    {
      name: 'name1',
      author: 'author1',
      isLost: false,
      isPrivate: false,
      tagList: new TagList({ tagsList: [new Tag({ name: TAG.ui })] }),
    },
    BookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
  );
  return [{ book: book, borrow: undefined }];
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// findOne-1
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const init_BookWithBorrow_findOne_1 = async (
  prismaService: PrismaService,
) => {
  await prismaService.users.create({
    data: { id: userId.toString(), name: 'name1' },
  });

  await prismaService.books.create({
    include: { tags: true },
    data: {
      id: bookId.toString(),
      name: 'name1',
      author: 'author1',
      is_losting: false,
      is_privates: false,
      tags: { create: { tag_name: TAG.ui } },
    },
  });

  await prismaService.borrow_histories.createMany({
    data: [
      {
        id: '5dea1394-ff8f-cbe0-5316-41027da0a4b4',
        book_id: bookId.toString(),
        user_id: userId.toString(),
        start_at: new Date('2022-05-10T09:25:11.847Z'),
        end_at: new Date('2022-05-11T09:25:11.847Z'),
      },
      {
        id: '73f68ce8-0215-8af5-545b-27ab47be38c1',
        book_id: bookId.toString(),
        user_id: userId.toString(),
        start_at: new Date('2022-05-18T09:25:11.847Z'),
        end_at: new Date('2022-05-19T09:25:11.847Z'),
      },
      {
        id: 'af6c06db-6e95-7503-4a04-a64fb8da735e',
        book_id: bookId.toString(),
        user_id: userId.toString(),
        start_at: new Date('2022-05-13T09:25:11.847Z'),
        end_at: new Date('2022-05-14T09:25:11.847Z'),
      },
    ],
  });
};

export const expected_BookWithBorrow_findOne_1 = () => {
  const book = Book.reBuild(
    {
      name: 'name1',
      author: 'author1',
      isLost: false,
      isPrivate: false,
      tagList: new TagList({ tagsList: [new Tag({ name: TAG.ui })] }),
    },
    BookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
  );

  const borrow = Borrow.reBuild(
    {
      bookId: bookId,
      userId: userId,
      startAt: new Date('2022-05-18T09:25:11.847Z'),
      endAt: new Date('2022-05-19T09:25:11.847Z'),
    },
    BorrowId.reBuild('73f68ce8-0215-8af5-545b-27ab47be38c1'),
  );
  return [{ book: book, borrow: borrow }];
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// findAll-2
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const init_BookWithBorrow_findOne_2 = async (
  prismaService: PrismaService,
) => {
  await prismaService.users.create({
    data: { id: userId.toString(), name: 'name1' },
  });

  await prismaService.books.create({
    include: { tags: true },
    data: {
      id: bookId.toString(),
      name: 'name1',
      author: 'author1',
      is_losting: false,
      is_privates: false,
      tags: { create: { tag_name: TAG.ui } },
    },
  });
};

export const expected_BookWithBorrow_findOne_2 = () => {
  const book = Book.reBuild(
    {
      name: 'name1',
      author: 'author1',
      isLost: false,
      isPrivate: false,
      tagList: new TagList({ tagsList: [new Tag({ name: TAG.ui })] }),
    },
    BookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
  );
  return [{ book: book, borrow: undefined }];
};
