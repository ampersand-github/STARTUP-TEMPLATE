import { Book, IBook } from 'src/domain/book/book';
import { Tag } from 'src/domain/book/tag/tag';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookId } from 'src/domain/book/book-id/book-id';
import { IPrismaBook } from './book-repository';
import { tags as IPrismaTags } from '@prisma/client';
import { LatestBorrow } from '../../../domain/book/latest-borrow/latest-borrow';

export const bookConverter = (prismaBook: IPrismaBook): Book => {
  const tags = prismaBook.tags.map(
    (one: IPrismaTags) => new Tag({ name: one.tag_name }),
  );
  const tagList = new TagList({ tagsList: tags });
  const props: IBook = {
    name: prismaBook.name,
    author: prismaBook.author,
    tagList: tagList,
    isLost: !!prismaBook.is_losting,
    isPrivate: !!prismaBook.is_privates,
    latestBorrow:
      prismaBook.borrow_histories.length === 1
        ? new LatestBorrow({
            startAt: prismaBook.borrow_histories[0].start_at,
            endAt: prismaBook.borrow_histories[0].end_at,
          })
        : undefined,
  };

  const bookId = BookId.reBuild(prismaBook.id);
  return Book.reBuild(props, bookId);
};
