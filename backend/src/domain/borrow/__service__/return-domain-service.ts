import { IBorrowRepository } from '../__interface__/borrow-repository-interface';
import { Borrow } from '../borrow';
import { OpenBook } from 'src/domain/open-book/open-book';
import { IOpenBookRepository } from '../../open-book/__interface__/open-book-repository-interface';
import { OpenBookId } from '../../open-book/open-book-id/open-book-id';

export interface IReturnDomainService {
  openBookId: OpenBookId;
  borrowR: IBorrowRepository;
  openBookR: IOpenBookRepository;
}

export const returnDomainService = async (props: IReturnDomainService) => {
  const openBook = await props.openBookR.findOne(props.openBookId);
  //
  if (!openBook) throw new Error('書籍が見つかりません');
  if (!openBook.idBorrowing())
    throw new Error('この書籍は貸し出されていません');
  //
  const borrow: Borrow = await props.borrowR.findOne(openBook.id);
  //
  const updateBorrow = Borrow.reBuild(
    {
      userId: borrow.getUserId(),
      openBookId: borrow.getOpenBookId(),
      startAt: borrow.getStartAt(),
      endAt: new Date(), // 値を入れることでレンタル終了を表現
    },
    borrow.id,
  );
  //
  const updateOpenBook = OpenBook.reBuild(
    {
      bookId: openBook.getBookId(),
      borrowingId: undefined, // ここ、はずすことでレンタル終了を表現
    },
    openBook.id,
  );

  // todo 結果整合性なり、longTrunsactionを考える必要がある
  await props.borrowR.save(updateBorrow);
  await props.openBookR.save(updateOpenBook);
};
