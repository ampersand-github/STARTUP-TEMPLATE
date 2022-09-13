import { createTestBook } from './create-test-book';
import { Book } from '../book';
import { BookId } from '../book-id/book-id';
import { BOOK_SIZE_TYPE, BookSize } from '../book-size/book-size';
import { createTestBorrower } from './create-test-borrower';
import { Borrower } from '../borrower/borrower';

describe('createTestBook', () => {
  it('値を何もしていしない場合', () => {
    // given:
    // when:
    const actual = createTestBook();
    // then:
    expect(actual).toStrictEqual(expect.any(Book));
  });

  it('値を付けたりつけなかった場合', () => {
    // given:
    const bookId = BookId.reConstruct('bookId');
    const author = 'author';
    const bookSize = new BookSize({ value: BOOK_SIZE_TYPE.bigSize });
    const borrower: Borrower = createTestBorrower(undefined, bookId);

    // when:
    const actual = createTestBook(
      bookId,
      undefined,
      author,
      bookSize,
      borrower,
      undefined,
    );

    // then:
    expect(actual).toEqual(expect.any(Book));
    expect(actual.id).toStrictEqual(bookId);
    expect(actual.author).toStrictEqual(author);
    expect(actual.bookSize.value).toStrictEqual(BOOK_SIZE_TYPE.bigSize);
    expect(actual.borrower).toStrictEqual(borrower);
    expect(actual.reservationList.values).toStrictEqual([]);
  });
});
