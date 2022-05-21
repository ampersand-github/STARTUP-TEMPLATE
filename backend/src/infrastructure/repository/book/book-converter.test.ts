import { Tag } from 'src/domain/book/tag/tag';
import { IPrismaBook } from './book-repository';
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
      start_at: new Date('2022-06-14T12:11:14.418Z'),
      end_at: null,
    },
  ],
};

describe('bookConverter', () => {
  it('end_atがnullのデータをコンバートできる', () => {
    const actual = bookConverter(prismaBook1);
    expect(actual).toStrictEqual(
      Book.reBuild(
        {
          name: prismaBook1.name,
          author: prismaBook1.author,
          tagList: new TagList({
            tagsList: [new Tag({ name: '運用' }), new Tag({ name: 'Go' })],
          }),
          isLost: prismaBook1.is_losting,
          isPrivate: prismaBook1.is_privates,
        },
        BookId.reBuild(bookId),
      ),
    );
  });

  it('end_atに日付のあるデータをコンバートできる', () => {
    const withEndAt = {
      ...prismaBook1,
      borrow_histories: [
        {
          start_at: new Date('2022-06-14T12:11:14.418Z'),
          end_at: new Date('2022-07-14T12:11:14.418Z'),
        },
      ],
    };
    const actual = bookConverter(withEndAt);
    expect(actual).toStrictEqual(
      Book.reBuild(
        {
          name: prismaBook1.name,
          author: prismaBook1.author,
          tagList: new TagList({
            tagsList: [new Tag({ name: '運用' }), new Tag({ name: 'Go' })],
          }),
          isLost: prismaBook1.is_losting,
          isPrivate: prismaBook1.is_privates,
        },
        BookId.reBuild(bookId),
      ),
    );
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
      },
      BookId.reBuild(bookId),
    );

    expect(actual).toStrictEqual(book);
  });
});
