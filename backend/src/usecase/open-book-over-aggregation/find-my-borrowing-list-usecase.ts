import { UserId } from '../../domain/user/user-id/user-id';
import { IBorrowRepository } from '../../domain/borrow/__interface__/borrow-repository-interface';
import { Borrow } from '../../domain/borrow/borrow';
import { OpenBookOAQS } from '../../infrastructure/query-service/open-book-over-aggregation-query-service';
import { IOpenBookOA } from './__interface__/open-book-OA-interface';
import { OneBookOutputDTO } from './__dto__/one-book-output-DTO';
import { OpenBookId } from '../../domain/open-book/open-book-id/open-book-id';

export interface IFindMyBorrowingListUC {
  userId: UserId;
  borrowR: IBorrowRepository;
  openBookOAQS: OpenBookOAQS;
}

export const findMyBorrowingListUC = async (
  props: IFindMyBorrowingListUC,
): Promise<OneBookOutputDTO[]> => {
  const findMany: Borrow[] = await props.borrowR.findManyByUserId(props.userId);
  const myBorrowingBookIdList: OpenBookId[] = findMany.map((one: Borrow) => {
    if (one.isBorrowing()) {
      return one.getOpenBookId();
    }
  });
  const many = await props.openBookOAQS.findMany(myBorrowingBookIdList);
  return many.map((one: IOpenBookOA) => new OneBookOutputDTO(one));
};
