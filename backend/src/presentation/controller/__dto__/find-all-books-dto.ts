import { Book } from 'src/domain/book/book';

// todo テストを書く
// todo 型を書く
export const findAllBooksDto = (allBooks: Book[]) => {
  return allBooks.map((one: Book) => {
    return { name: one.name, tagList: one.tagList };
  });
};
