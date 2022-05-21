import { Borrow } from '../borrow';
import { UserId } from '../../user/user-id/user-id';
import { IBorrowRepository } from '../__interface__/borrow-repository-interface';

export interface ICanUserAdditionalBorrow {
  userId: UserId;
  borrowR: IBorrowRepository;
}

export const canUserAdditionalBorrowDomainService = async (
  props: ICanUserAdditionalBorrow,
): Promise<boolean> => {
  const MAX_BORROW_LIMIT = 5;

  const findAllByUser = await props.borrowR.findAllByUserId(props.userId);
  const myBorrowingList = findAllByUser.filter((one: Borrow) =>
    one.isBorrowing(),
  );

  return myBorrowingList.length < MAX_BORROW_LIMIT;
};
