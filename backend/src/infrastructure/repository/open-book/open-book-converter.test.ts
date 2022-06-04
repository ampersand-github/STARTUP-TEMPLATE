import { BorrowId } from 'src/domain/borrow/borrow-id/borrow-id';
import { IPrismaOpenBook } from './open-book-repository';
import { openBookConverter } from './open-book-converter';
import { OpenBook } from 'src/domain/open-book/open-book';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { BookId } from 'src/domain/book/book-id/book-id';

describe('openBookConverter', () => {
  it('貸し出していない公開書籍を変換できる', () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const prismaOpenBook: IPrismaOpenBook = {
      id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
      book_id: '2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1',
      borrow_histories_id: null,
      updated_at: new Date('2022-05-14T05:49:26.505Z'),
      created_at: new Date('2022-05-14T05:49:26.505Z'),
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = openBookConverter(prismaOpenBook);
    const expected = OpenBook.reBuild(
      {
        bookId: BookId.reBuild(prismaOpenBook.book_id),
        borrowingId: undefined,
      },
      OpenBookId.reBuild(prismaOpenBook.id),
    );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(actual).toStrictEqual(expected);
  });

  it('貸し出している公開書籍を変換できる', () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const prismaOpenBook: IPrismaOpenBook = {
      id: '2422c514-4b06-aced-5ef3-3f869d299bd8',
      book_id: '2f5d11a19-2ba7-7f25-99a3-756e83d9b8d1',
      borrow_histories_id: '48d76298-2149-e236-15cc-8d656bc642e9',
      updated_at: new Date('2022-05-14T05:49:26.505Z'),
      created_at: new Date('2022-05-14T05:49:26.505Z'),
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = openBookConverter(prismaOpenBook);
    const expected = OpenBook.reBuild(
      {
        bookId: BookId.reBuild(prismaOpenBook.book_id),
        borrowingId: BorrowId.reBuild(prismaOpenBook.borrow_histories_id),
      },
      OpenBookId.reBuild(prismaOpenBook.id),
    );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(actual).toStrictEqual(expected);
  });
});
