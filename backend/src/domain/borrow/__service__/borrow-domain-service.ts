import { UserId } from 'src/domain/user/user-id/user-id';
import { IBorrowRepository } from 'src/domain/borrow/__interface__/borrow-repository-interface';
import { canAdditionalBorrowDS } from './can-additional-borrow-domain-service';
import { Borrow } from 'src/domain/borrow/borrow';
import { OpenBook } from 'src/domain/open-book/open-book';
import { IOpenBookRepository } from 'src/domain/open-book/__interface__/open-book-repository-interface';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';

export interface IBorrowDomainService {
  userId: UserId;
  openBookId: OpenBookId;
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

  const reBuildOpenBook = await props.openBookR.findOne(props.openBookId);
  if (!reBuildOpenBook) throw new Error('存在しません');
  if (reBuildOpenBook.idBorrowing()) throw new Error('この書籍は貸出中です。');

  const borrow = Borrow.create({
    userId: props.userId,
    openBookId: reBuildOpenBook.id,
    startAt: new Date(),
    endAt: undefined,
  });

  const openBook = OpenBook.reBuild(
    {
      bookId: reBuildOpenBook.getBookId(),
      borrowingId: borrow.id,
    },
    reBuildOpenBook.id,
  );

  // todo 結果整合性なり、longTrunsactionを考える必要がある
  await props.borrowR.save(borrow);
  await props.openBookR.save(openBook);
};
