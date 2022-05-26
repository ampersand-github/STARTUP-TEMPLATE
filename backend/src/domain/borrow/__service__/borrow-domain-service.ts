import { UserId } from '../../user/user-id/user-id';
import { IBorrowRepository } from '../__interface__/borrow-repository-interface';
import { canAdditionalBorrowDS } from './can-additional-borrow-domain-service';
import { Borrow } from '../borrow';
import { OpenBook } from 'src/domain/open-book/open-book';
import { IOpenBookRepository } from '../../open-book/__interface__/open-book-repository-interface';

export interface IBorrowDomainService {
  userId: UserId;
  openBook: OpenBook;
  borrowR: IBorrowRepository;
  openBookR: IOpenBookRepository;
}

export const borrowDomainService = async (props: IBorrowDomainService) => {
  const canBorrow: boolean = await canAdditionalBorrowDS({
    userId: props.userId,
    borrowR: props.borrowR,
  });
  if (!canBorrow)
    throw new Error('同時に借りることのできる書籍は5冊までです。');

  if (props.openBook.idBorrowing()) throw new Error('この書籍は貸出中です。');

  const borrow = Borrow.create({
    userId: props.userId,
    openBookId: props.openBook.id,
    startAt: new Date(),
    endAt: undefined,
  });

  const openBook = OpenBook.reBuild(
    {
      bookId: props.openBook.getBookId(),
      borrowingId: borrow.id,
    },
    props.openBook.id,
  );

  await props.borrowR.save(borrow);
  await props.openBookR.save(openBook);
};
