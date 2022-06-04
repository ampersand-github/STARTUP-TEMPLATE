import { UserId } from 'src/domain/user/user-id/user-id';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { IOpenBookRepository } from 'src/domain/open-book/__interface__/open-book-repository-interface';
import { IBorrowRepository } from 'src/domain/borrow/__interface__/borrow-repository-interface';
import { borrowDomainService } from 'src/domain/borrow/__service__/borrow-domain-service';

export interface IBorrowBookUC {
  userId: UserId;
  openBookId: OpenBookId;
  openBookR: IOpenBookRepository;
  borrowR: IBorrowRepository;
}
export const BorrowBookUC = async (props: IBorrowBookUC) => {
  await borrowDomainService({
    userId: props.userId,
    openBookId: props.openBookId,
    openBookR: props.openBookR,
    borrowR: props.borrowR,
  });
};
