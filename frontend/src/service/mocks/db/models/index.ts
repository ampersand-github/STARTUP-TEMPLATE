import { book, defaultBooks, IBook } from 'src/service/mocks/db/models/book';

export const dictionary = {
  book,
};

export const defaultValues: { books: IBook[] } = {
  books: defaultBooks,
};
