import { Tag } from '../tag';
import { BookId } from '../book-id';
import { Book, IBook } from '../book';
import { TagList } from '../tag-list';

describe('Book', () => {
  const name = 'book1';
  const tag1 = new Tag({ name: '技術書' });
  const tag2 = new Tag({ name: '小説' });
  const tag3 = new Tag({ name: '図鑑' });
  const tagList = new TagList({ tags: [tag1, tag2, tag3] });
  const props: IBook = { name: name, tagList: tagList };

  describe('constructor', () => {
    it('createできる', () => {
      const book = Book.create(props);
      expect(book).toEqual(expect.any(Book));
    });
    it('reBuildできる', () => {
      const bookId = BookId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
      const book = Book.reBuild(props, bookId);
      expect(book).toEqual(expect.any(Book));
      expect(book.id).toEqual(bookId);
    });
  });

  describe('get', () => {
    const book = Book.create(props);
    it('nameが正しく取得できる', () => {
      expect(book.name).toEqual(props.name);
    });
    it('タグリストが正しく取得できる', () => {
      expect(book.tagList).toEqual([tag1.value, tag2.value, tag3.value]);
    });
  });
});
