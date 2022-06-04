import { IPrismaBorrow } from './borrow-repository';
import { Borrow, IBorrow } from 'src/domain/borrow/borrow';
import { UserId } from 'src/domain/user/user-id/user-id';
import { BorrowId } from 'src/domain/borrow/borrow-id/borrow-id';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';

export const borrowConverter = (prismaBorrow: IPrismaBorrow): Borrow => {
  const props: IBorrow = {
    openBookId: OpenBookId.reBuild(prismaBorrow.open_book_id),
    userId: UserId.reBuild(prismaBorrow.user_id),
    startAt: prismaBorrow.start_at,
    endAt: prismaBorrow.end_at ? prismaBorrow.end_at : undefined,
  };

  const borrowId = BorrowId.reBuild(prismaBorrow.id);
  return Borrow.reBuild(props, borrowId);
};
