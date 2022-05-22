import { IBookWithBorrowQS } from './__interface__/book-with-borrow-qs-interface';
import { BookId } from '../../domain/book/book-id/book-id';
import { BookWithBorrowDetailOutputDto } from './__dto__/book-with-borrow-detail-output-dto';
import { BookWithBorrowListOutputDto } from './__dto__/book-with-borrow-list-output-dto';

export const findOneBookWithBorrowUC = async (
  bookId: BookId,
  qs: IBookWithBorrowQS,
): Promise<BookWithBorrowListOutputDto> => {
  const one = await qs.findOne(bookId);

  if (!one) throw new Error('該当の書籍が見つかりません。');

  return new BookWithBorrowDetailOutputDto({
    name: one.book.getName(),
    author: one.book.getAuthor(),
    tagList: one.book.getTagList().toString(),
    isBorrowing: one.borrow.isBorrowing(),
    isLost: one.book.getIsLost(),
    isPrivate: one.book.getIsPrivate(),
  });
};
