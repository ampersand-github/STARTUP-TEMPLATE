import { Borrow } from 'src/domain/book/borrower/_borrow/borrow';
import { UserId } from 'src/domain/user/user-id/user-id';
import { IBorrowRepository } from 'src/domain/book/borrower/_borrow/__interface__/borrow-repository-interface';

export interface ICanAdditionalBorrow {
  userId: UserId;
  borrowR: IBorrowRepository;
}

export const canAdditionalBorrowDS = async (
  props: ICanAdditionalBorrow,
): Promise<boolean> => {
  const MAX_BORROW_LIMIT = 5;

  const findMany = await props.borrowR.findManyByUserId(props.userId);
  const myBorrowingList = findMany.filter((one: Borrow) => one.isBorrowing());

  return myBorrowingList.length < MAX_BORROW_LIMIT;
};
