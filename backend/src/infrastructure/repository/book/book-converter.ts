import { Book, IBook } from 'src/domain/book/book';
import { Tag } from 'src/domain/book/tag/tag';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookId } from 'src/domain/book/book-id/book-id';
import { IPrismaBook } from './book-repository';
import {
  borrow_histories as IPrismaBorrowHistories,
  tags as IPrismaTags,
} from '@prisma/client';
import { Borrow } from '../../../domain/book/borrow/borrow';
import { UserId } from '../../../domain/user/user-id/user-id';
import {BorrowId} from "../../../domain/book/borrow/borrow-id";

export const bookConverter = (prismaBook: IPrismaBook): Book => {
  const tags = prismaBook.tags.map(
    (one: IPrismaTags) => new Tag({ name: one.tag_name }),
  );
  const tagList = new TagList({ tagsList: tags });
  const latestBorrow = selectLatestBorrow(prismaBook.borrow_histories);

  const props: IBook = {
    name: prismaBook.name,
    author: prismaBook.author,
    tagList: tagList,
    isLost: !!prismaBook.is_losting,
    isPrivate: !!prismaBook.is_privates,
    latestBorrow: latestBorrow,
  };

  const bookId = BookId.reBuild(prismaBook.id);
  return Book.reBuild(props, bookId);
};

const selectLatestBorrow = (
  borrowHistories: IPrismaBorrowHistories[],
): Borrow | null => {
  if (borrowHistories.length === 0) return undefined;
  const latest: IPrismaBorrowHistories = borrowHistories.reduce((a, b) =>
    a.start_at.getTime() > b.start_at.getTime() ? a : b,
  );
  return Borrow.reBuild({
    bookId: BookId.reBuild(latest.book_id),
    userId: UserId.reBuild(latest.user_id),
    startAt: latest.start_at,
    endAt: latest.end_at ? latest.end_at : undefined,
  },BorrowId.reBuild(latest.id));
};
