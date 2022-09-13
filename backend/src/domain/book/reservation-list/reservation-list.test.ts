import { Reservation } from './reservation';
import { BookId } from '../book-id/book-id';
import { UserId } from '../../user/user-id/user-id';
import { ReservationList } from './reservation-list';

describe('ReservationList', () => {
  it('construct', () => {
    // given:
    const bookId = BookId.construct();
    const r1 = new Reservation({
      userId: UserId.construct(),
      bookId: bookId,
      reservationAt: new Date('2022-09-13T22:31:12.169Z'),
    });
    const r2 = new Reservation({
      userId: UserId.construct(),
      bookId: bookId,
      reservationAt: new Date('2022-09-14T22:31:12.169Z'),
    });
    const r3 = new Reservation({
      userId: UserId.construct(),
      bookId: bookId,
      reservationAt: new Date('2022-09-11T22:31:12.169Z'),
    });

    // when:
    const actual = new ReservationList({ values: [r1, r2, r3] });

    // then:
    // 予約日時が古い順
    expect(actual.values).toStrictEqual([r3,r1,r2]);
  });
});
