import {
  IBookWithBorrow,
  IBookWithBorrowQS,
} from './__interface__/book-with-borrow-qs-interface';
import { BookWithBorrowListOutputDto } from './__dto__/book-with-borrow-list-output-dto';

export const findAllBookWithBorrowUC = async (
  qs: IBookWithBorrowQS,
): Promise<BookWithBorrowListOutputDto[]> => {
  const findAll = await qs.findAll();

  return findAll.map((one: IBookWithBorrow) => {
    return new BookWithBorrowListOutputDto({
      name: one.book.getName(),
      author: one.book.getAuthor(),
      tagList: one.book.getTagList().toString(),
      isBorrowing: one.borrow.isBorrowing(),
    });
  });
};
