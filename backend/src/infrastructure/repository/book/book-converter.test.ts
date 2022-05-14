import { Book, IBook } from 'src/domain/book/book';
import { Tag } from 'src/domain/book/tag/tag';
import { IPrismaBook } from './book-repository';
import { tags as IPrismaTags } from '@prisma/client';
import { bookConverter } from './book-converter';
import { Borrow } from '../../../domain/book/borrow/borrow';
import { UserId } from '../../../domain/user/user-id/user-id';
import { BookId } from '../../../domain/book/book-id/book-id';

const bookId = '2422c514-4b06-aced-5ef3-3f869d299bd8';
const prismaBook1: IPrismaBook = {
  id: bookId,
  name: 'セキュア・バイ・デザイン',
  author: 'author1',
  updated_at: new Date('2022-05-14T05:49:26.505Z'),
  created_at: new Date('2022-05-14T05:49:26.505Z'),
  tags: [
    { tag_name: '運用', book_id: bookId },
    { tag_name: 'Go', book_id: bookId },
  ],
  lostings: { book_id: bookId },
  privates: null,
  borrow_histories: [
    {
      book_id: bookId,
      user_id: 'aaa',
      start_at: new Date('2022-05-14T12:11:14.418Z'),
      end_at: null,
    },
  ],
};

describe('bookConverter', () => {
  it('コンバートできる', () => {
    const actual = bookConverter(prismaBook1);
    expect(actual.id.toString()).toStrictEqual(prismaBook1.id);
    expect(actual.getName()).toStrictEqual(prismaBook1.name);
    expect(actual.getAuthor()).toStrictEqual(prismaBook1.author);
    const tags = prismaBook1.tags.map(
      (one: IPrismaTags) => new Tag({ name: one.tag_name }),
    );
    const tagCollection = actual.getTagList().getCollection();
    expect(tagCollection).toEqual(expect.arrayContaining(tags));
    expect(actual.getIsLost()).toStrictEqual(!!prismaBook1.lostings);
    expect(actual.getIsPrivate()).toStrictEqual(!!prismaBook1.privates);
    expect(actual.getLatestBorrow()).toStrictEqual(
      new Borrow({
        bookId: BookId.reBuild(bookId),
        userId: UserId.reBuild('aaa'),
        startAt: new Date('2022-05-14T12:11:14.418Z'),
        endAt: undefined,
      }),
    );
  });
});
