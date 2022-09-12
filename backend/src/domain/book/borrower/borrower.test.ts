import { UserId } from '../../user/user-id/user-id';
import { BookId } from '../book-id/book-id';
import { Borrower, IBorrower } from './borrower';

describe('Borrow', () => {
  // given:
  const props: IBorrower = {
    userId: UserId.reConstruct('8e37f697-581a-3486-bb79-80348c153828'),
    bookId: BookId.reConstruct('8e37f697-581a-3486-bb79-80348c153828'),
    startAt: new Date(),
    returnAt: undefined,
    scheduledReturnAt: undefined,
  };

  describe('constructor', () => {
    // when:
    const expected = new Borrower(props);
    it('construct', () => {
      // then:
      expect(expected).toStrictEqual(expect.any(Borrower));
    });
    it('取得できる', () => {
      // then:
      expect(expected.userId).toStrictEqual(props.userId);
      expect(expected.bookId).toStrictEqual(props.bookId);
      expect(expected.startAt).toStrictEqual(props.startAt);
      expect(expected.returnAt).toStrictEqual(props.returnAt);
      expect(expected.scheduledReturnAt).toStrictEqual(props.scheduledReturnAt);
    });
  });
});
