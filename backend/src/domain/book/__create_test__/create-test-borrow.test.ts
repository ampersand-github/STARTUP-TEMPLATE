import { createTestBorrower } from './create-test-borrower';
import { Borrower } from '../borrower/borrower';

describe('createTestReservation', () => {
  it('作成できる', () => {
    // given:
    // when:
    const actual = createTestBorrower();
    // then:
    expect(actual).toStrictEqual(expect.any(Borrower));
  });
});
