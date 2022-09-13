import { UserId } from '../../user/user-id/user-id';
import { BookId } from '../book-id/book-id';
import { Borrower } from '../borrower/borrower';

export const createTestBorrower = (
  userId: UserId = UserId.construct(),
  bookId: BookId = BookId.construct(),
  startAt: Date = new Date(),
  scheduledReturnAt: Date = new Date(),
): Borrower => {
  return new Borrower({
    userId: userId,
    bookId: bookId,
    startAt: startAt,
    scheduledReturnAt: scheduledReturnAt,
  });
};
