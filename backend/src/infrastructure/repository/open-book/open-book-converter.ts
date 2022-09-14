import { BookId } from 'src/domain/book/book-id/book-id';
import { IOpenBook, OpenBook } from 'src/domain/open-book/open-book';
import { BorrowerId } from 'src/domain/book/borrower/borrower-id/borrow-id';
import { IPrismaOpenBook } from './open-book-repository';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';

export const openBookConverter = (
  prismaOpenBook: IPrismaOpenBook,
): OpenBook => {
  const props: IOpenBook = {
    bookId: BookId.reBuild(prismaOpenBook.book_id),
    borrowingId: prismaOpenBook.borrow_histories_id
      ? BorrowerId.reBuild(prismaOpenBook.borrow_histories_id)
      : undefined,
  };

  const openBookId = OpenBookId.reBuild(prismaOpenBook.id);
  return OpenBook.reBuild(props, openBookId);
};
