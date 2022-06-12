import { drop, factory } from '@mswjs/data';
import { defaultValues, dictionary } from './models';
import { IBook } from 'src/service/mocks/db/models/book';

export const db = factory(dictionary);

export function seed(values = defaultValues) {
  drop(db);
  const nextValues = {
    ...defaultValues,
    ...values,
  };
  nextValues.books.map((book: IBook) => db.book.create(book));
}
