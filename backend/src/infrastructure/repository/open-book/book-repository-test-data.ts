import { BookId } from 'src/domain/book/book-id/book-id';
import { OpenBook } from 'src/domain/open-book/open-book';
import { BorrowerId } from 'src/domain/book/borrower/borrower-id/borrow-id';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// findOne()/save()
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const initOpenBookRepository1 = async (prismaService: PrismaService) => {
  await prismaService.books.create({
    data: {
      id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
      name: 'name1',
      author: 'author',
    },
  });
};

export const newOpenBook = OpenBook.reBuild(
  {
    bookId: BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8'),
    borrowingId: undefined,
  },
  OpenBookId.reBuild('2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1'),
);

export const initOpenBookRepository2 = async (prismaService: PrismaService) => {
  await prismaService.books.create({
    data: {
      id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
      name: 'name1',
      author: 'author',
    },
  });
  await prismaService.users.create({
    data: {
      id: '92fd2abe-5b68-12ec-1fec-10138bb40c62',
      name: 'user1',
    },
  });
  await prismaService.borrow_histories.create({
    data: {
      id: '48d76298-2149-e236-15cc-8d656bc642e9',
      open_book_id: '2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1',
      user_id: '92fd2abe-5b68-12ec-1fec-10138bb40c62',
      start_at: new Date(),
      end_at: null,
    },
  });
};

export const updateOpenBook = OpenBook.reBuild(
  {
    bookId: BookId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8'),
    borrowingId: BorrowerId.reBuild('48d76298-2149-e236-15cc-8d656bc642e9'),
  },
  OpenBookId.reBuild('2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1'),
);
