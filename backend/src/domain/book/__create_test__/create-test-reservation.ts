import { UserId } from '../../user/user-id/user-id';
import { BookId } from '../book-id/book-id';
import { Reservation } from '../reservation-list/reservation';

export const createTestReservation = (
  userId: UserId = UserId.construct(),
  bookId: BookId = BookId.construct(),
  reservationAt: Date = new Date(),
): Reservation => {
  return new Reservation({
    userId: userId,
    bookId: bookId,
    reservationAt: reservationAt,
  });
};
