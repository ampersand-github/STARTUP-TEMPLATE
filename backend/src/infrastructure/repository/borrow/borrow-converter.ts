import { IPrismaBorrow } from './borrow-repository';
import { Borrow, IBorrow } from '../../../domain/borrow/borrow';
import { BookId } from '../../../domain/book/book-id/book-id';
import { UserId } from '../../../domain/user/user-id/user-id';
import { BorrowId } from '../../../domain/borrow/borrow-id/borrow-id';

export const borrowConverter = (prismaBorrow: IPrismaBorrow): Borrow => {
  const props: IBorrow = {
    bookId: BookId.reBuild(prismaBorrow.book_id),
    userId: UserId.reBuild(prismaBorrow.user_id),
    startAt: prismaBorrow.start_at,
    endAt: prismaBorrow.end_at ? prismaBorrow.end_at : undefined,
  };

  const borrowId = BorrowId.reBuild(prismaBorrow.id);
  return Borrow.reBuild(props, borrowId);
};
