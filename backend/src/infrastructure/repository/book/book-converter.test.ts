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
  is_losting: true,
  is_privates: false,
  updated_at: new Date('2022-05-14T05:49:26.505Z'),
  created_at: new Date('2022-05-14T05:49:26.505Z'),
  tags: [
    { tag_name: '運用', book_id: bookId },
    { tag_name: 'Go', book_id: bookId },
  ],
  borrow_histories: [
    {
      book_id: bookId,
      user_id: '6b6d4447-cf09-5415-e52e-261a456a204a',
      start_at: new Date('2022-03-01T12:11:14.418Z'),
      end_at: new Date('2022-03-11T12:11:14.418Z'),
    },
    {
      book_id: bookId,
      user_id: '92b0294e-e254-a40d-ac06-8378c188dac6',
      start_at: new Date('2022-04-14T12:11:14.418Z'),
      end_at: new Date('2022-04-19T12:11:14.418Z'),
    },
    {
      book_id: bookId,
      user_id: '9b0abf1a-87b7-ed4c-ed3a-a0d6642f058b',
      start_at: new Date('2022-05-14T12:11:14.418Z'),
      end_at: new Date('2022-05-15T12:11:14.418Z'),
    },
    {
      // ↓ 最新の貸出 ↓
      book_id: bookId,
      user_id: '3e2cfb03-e17b-660f-80b8-a3e6426cea66',
      start_at: new Date('2022-06-14T12:11:14.418Z'),
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
    expect(actual.getIsLost()).toStrictEqual(!!prismaBook1.is_losting);
    expect(actual.getIsPrivate()).toStrictEqual(!!prismaBook1.is_privates);
    expect(actual.getLatestBorrow()).toStrictEqual(
      // 最新の貸出なら正しい
      new Borrow({
        bookId: BookId.reBuild(bookId),
        userId: UserId.reBuild('3e2cfb03-e17b-660f-80b8-a3e6426cea66'),
        startAt: new Date('2022-06-14T12:11:14.418Z'),
        endAt: undefined,
      }),
    );
  });
  it('borrow_historiesが空', () => {
    const blankBorrowHistories = { ...prismaBook1, borrow_histories: [] };
    const actual = bookConverter(blankBorrowHistories);
    expect(actual.getLatestBorrow()).toStrictEqual(undefined);
  });
});