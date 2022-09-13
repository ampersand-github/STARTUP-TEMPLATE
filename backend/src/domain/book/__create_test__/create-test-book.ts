import { Book } from '../book';
import { BookId } from '../book-id/book-id';
import { faker } from '@faker-js/faker';
import { BOOK_SIZE_TYPE, BookSize } from '../book-size/book-size';
import { fetchRandomOne } from '../../../util/fetch-random-one/fetch-random-one';
import { Borrower } from '../borrower/borrower';
import { ReservationList } from '../reservation-list/reservation-list';
import { createTestBorrower } from './create-test-borrower';

const bookSizeKey = fetchRandomOne(Object.keys(BOOK_SIZE_TYPE));
export const createTestBook = (
  id: BookId = BookId.construct(),
  name: string = faker.name.fullName(),
  author: string = faker.name.fullName(),
  bookSize: BookSize = new BookSize({ value: BookSize[bookSizeKey] }),
  borrower: Borrower = createTestBorrower(undefined, id),
  reservationList: ReservationList = new ReservationList({ values: [] }),
): Book => {
  return Book.reConstruct(
    {
      name: name,
      author: author,
      bookSize: bookSize,
      borrower: borrower,
      reservationList: reservationList,
    },
    id,
  );
};
