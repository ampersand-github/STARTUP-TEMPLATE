import { Borrow, IBorrow } from './borrow';
import { UserId } from '../user/user-id/user-id';
import { BorrowId } from './borrow-id/borrow-id';
import { OpenBookId } from '../open-book/open-book-id/open-book-id';

describe('Borrow', () => {
  describe('constructor', () => {
    const props: IBorrow = {
      userId: UserId.reBuild('8e37f697-581a-3486-bb79-80348c153828'),
      openBookId: OpenBookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
      startAt: new Date(),
      endAt: null,
    };
    it('createできる', () => {
      const expected = Borrow.create(props);
      expect(expected).toStrictEqual(expect.any(Borrow));
    });
    it('reBuildできる', () => {
      const borrowId = BorrowId.reBuild('8c8a2746-6b82-690e-3ed8-0b5552707c9d');
      const expected = Borrow.reBuild(props, borrowId);
      expect(expected).toStrictEqual(expect.any(Borrow));
      expect(expected.id.toString()).toStrictEqual(borrowId.toString());
    });
  });

  describe('get()', () => {
    const props: IBorrow = {
      userId: UserId.reBuild('8e37f697-581a-3486-bb79-80348c153828'),
      openBookId: OpenBookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
      startAt: new Date(),
      endAt: null,
    };
    const expected = Borrow.create(props);
    it('userIdが習得できる', () => {
      expect(expected.getUserId()).toEqual(props.userId);
    });
    it('userIdが習得できる', () => {
      expect(expected.getOpenBookId()).toEqual(props.openBookId);
    });
  });

  describe('isBorrowing()', () => {
    const props: IBorrow = {
      userId: UserId.reBuild('8e37f697-581a-3486-bb79-80348c153828'),
      openBookId: OpenBookId.reBuild('64cd7892-966b-0238-72a9-e2b87b29c580'),
      startAt: new Date(),
      endAt: null,
    };
    it('貸出中', () => {
      const expected = Borrow.create(props);
      expect(expected.isBorrowing()).toStrictEqual(true);
    });
    it('貸出が終了している', () => {
      const props2: IBorrow = { ...props, endAt: new Date() };
      const expected = Borrow.create(props2);
      expect(expected.isBorrowing()).toStrictEqual(false);
    });
  });
});
