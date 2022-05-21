import { Book } from '../../book/book';
import { UserId } from '../../user/user-id/user-id';
import { IBorrowRepository } from '../__interface__/borrow-repository-interface';
import { canUserAdditionalBorrowDomainService } from './can-user-additional-borrow-domain-service';
import { isBorrowingDomainService } from './is-borrowing-domain-service';
import { Borrow } from '../borrow';

export interface IBorrowDomainService {
  userId: UserId;
  book: Book;
  borrowR: IBorrowRepository;
}

export const borrowDomainService = async (props: IBorrowDomainService) => {
  if (props.book.getIsPrivate())
    throw new Error('この書籍は閉架にあり、貸し出すことができません。');

  if (props.book.getIsLost())
    throw new Error(
      'この書籍は紛失中の書籍です。カウンターで紛失解除の手続きしてください。',
    );

  const canUserAdditionalBorrow: boolean =
    await canUserAdditionalBorrowDomainService({
      userId: props.userId,
      borrowR: props.borrowR,
    });
  if (!canUserAdditionalBorrow)
    throw new Error('同時に借りることのできる書籍は5冊までです。');

  const isBorrowing: boolean = await isBorrowingDomainService({
    book: props.book,
    borrowR: props.borrowR,
  });
  if (isBorrowing) throw new Error('この書籍は貸出中です。');

  const borrow = Borrow.create({
    userId: props.userId,
    bookId: props.book.id,
    startAt: new Date(),
    endAt: undefined,
  });

  await props.borrowR.save(borrow);
};
