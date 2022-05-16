import { Tag } from 'src/domain/book/tag/tag';
import { IPrismaBook } from './book-repository';
import { tags as IPrismaTags } from '@prisma/client';
import { bookConverter } from './book-converter';
import { Book } from '../../../domain/book/book';
import { TagList } from '../../../domain/book/tag/tag-list';
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
      id: '1606547a-549e-bf09-b566-382a6fabd1a2',
      book_id: bookId,
      user_id: '6b6d4447-cf09-5415-e52e-261a456a204a',
      start_at: new Date('2022-03-01T12:11:14.418Z'),
      end_at: new Date('2022-03-11T12:11:14.418Z'),
    },
    {
      id: '2e068bc9-eed9-a693-d285-69f6cfd469cd',
      book_id: bookId,
      user_id: '92b0294e-e254-a40d-ac06-8378c188dac6',
      start_at: new Date('2022-04-14T12:11:14.418Z'),
      end_at: new Date('2022-04-19T12:11:14.418Z'),
    },
    {
      id: '9a28bee7-ac75-514f-7e7c-942dc8488456',
      book_id: bookId,
      user_id: '9b0abf1a-87b7-ed4c-ed3a-a0d6642f058b',
      start_at: new Date('2022-05-14T12:11:14.418Z'),
      end_at: new Date('2022-05-15T12:11:14.418Z'),
    },
    {
      // ↓ 最新の貸出 ↓
      id: 'b6ac88d6-9c5e-6739-787d-3fc248ae4212',
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
    const book = Book.reBuild(
      {
        name: prismaBook1.name,
        author: prismaBook1.author,
        tagList: new TagList({
          tagsList: [new Tag({ name: '運用' }), new Tag({ name: 'Go' })],
        }),
        isLost: prismaBook1.is_losting,
        isPrivate: prismaBook1.is_privates,
        isBorrowing: true,
      },
      BookId.reBuild(bookId),
    );
    expect(actual).toStrictEqual(book);
  });

  it('borrow_historiesが空', () => {
    const blankBorrowHistories = { ...prismaBook1, borrow_histories: [] };
    const actual = bookConverter(blankBorrowHistories);
    const book = Book.reBuild(
      {
        name: prismaBook1.name,
        author: prismaBook1.author,
        tagList: new TagList({
          tagsList: [new Tag({ name: '運用' }), new Tag({ name: 'Go' })],
        }),
        isLost: prismaBook1.is_losting,
        isPrivate: prismaBook1.is_privates,
        isBorrowing: false,
      },
      BookId.reBuild(bookId),
    );

    expect(actual).toStrictEqual(book);
  });
});
