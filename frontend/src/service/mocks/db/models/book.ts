import { primaryKey } from '@mswjs/data';

export const book = {
  id: primaryKey(String),
  title: String,
  price: Number,
};

export interface IBook {
  id: string;
  title: string;
  price: number;
}
export type IBookWithoutId = Omit<IBook, 'id'>;

export const defaultBooks: IBook[] = [
  { id: 'id1', title: 'title1', price: 1000 },
  { id: 'id2', title: 'title2', price: 2000 },
  { id: 'id3', title: 'title3', price: 3000 },
];
