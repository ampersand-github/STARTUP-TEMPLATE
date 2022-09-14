import { IReservation, Reservation } from './reservation';
import { UserId } from '../../user/user-id/user-id';
import { BookId } from '../book-id/book-id';

describe('Reservation', () => {
  it('Reservation', () => {
    // given:
    const props: IReservation = {
      userId: UserId.construct(),
      bookId: BookId.construct(),
      reservationAt: new Date(),
    };
    // when:
    const actual = new Reservation(props);
    // then:
    expect(actual.userId).toStrictEqual(props.userId);
    expect(actual.bookId).toStrictEqual(props.bookId);
    expect(actual.reservationAt).toStrictEqual(props.reservationAt);
  });
});
