import { UserId } from '../../user/user-id/user-id';
import { BookId } from '../book-id/book-id';
import { ValueObject } from '../../__shared__/value-object';

export interface IReservation {
  userId: UserId;
  bookId: BookId;
  reservationAt: Date;
}

export class Reservation extends ValueObject<IReservation> {
  public readonly userId: IReservation['userId'];
  public readonly bookId: IReservation['bookId'];
  public readonly reservationAt: IReservation['reservationAt'];

  public constructor(props: IReservation) {
    super(props);
    this.userId = props.userId;
    this.bookId = props.bookId;
    this.reservationAt = props.reservationAt;
  }
}
