import { UserId } from '../../user/user-id/user-id';
import { BookId } from "../book-id/book-id";
import { Borrower, IBorrower } from "./borrower";
import { BorrowerId } from "./borrower-id/borrower-id";


describe('Borrow', () => {
  const props: IBorrower = {
    userId: UserId.reConstruct('8e37f697-581a-3486-bb79-80348c153828'),
    bookId: BookId.reConstruct('8e37f697-581a-3486-bb79-80348c153828'),
    startAt: new Date(),
    returnAt:undefined,
    scheduledReturnAt:undefined
  };

  describe('constructor', () => {
    it('construct', () => {
      const expected = Borrower.create(props);
      expect(expected).toStrictEqual(expect.any(Borrower));
    });
    it('reConstruct', () => {
      const borrowId = BorrowerId.reConstruct('8c8a2746-6b82-690e-3ed8-0b5552707c9d');
      const expected = Borrower.reBuild(props, borrowId);
      expect(expected).toStrictEqual(expect.any(Borrower));
    });
  });

  describe('get', () => {
    const expected = Borrower.create(props);
    it('取得できる', () => {
      expect(expected.userId).toStrictEqual(props.userId);
      expect(expected.bookId).toStrictEqual(props.bookId);
      expect(expected.startAt).toStrictEqual(props.startAt);
      expect(expected.returnAt).toStrictEqual(props.returnAt);
      expect(expected.scheduledReturnAt).toStrictEqual(props.scheduledReturnAt);

    });

  });
});
