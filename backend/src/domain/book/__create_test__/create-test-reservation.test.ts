import { createTestReservation } from './create-test-reservation';
import { Reservation } from '../reservation-list/reservation';

describe('createTestReservation', () => {
  it('作成できる', () => {
    // given:
    // when:
    const actual = createTestReservation();
    // then:
    expect(actual).toStrictEqual(expect.any(Reservation));
  });
});
