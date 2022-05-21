import { IBorrowRepository } from '../__interface__/borrow-repository-interface';
import { Book } from '../../book/book';
import { Borrow } from '../borrow';

export interface IisBorrowing {
  book: Book;
  borrowR: IBorrowRepository;
}

// 貸出中かどうかだけを判断する
// true : 貸出中
export const isBorrowingDomainService = async (
  props: IisBorrowing,
): Promise<boolean> => {
  const findAllByBook = await props.borrowR.findAllByBookId(props.book.id);

  // 貸出実績がない。(まだ借りられていない)
  if (findAllByBook.length === 0) return false;

  const result = findAllByBook.find((one: Borrow) => !one.getEndAt());

  return !!result;
};
