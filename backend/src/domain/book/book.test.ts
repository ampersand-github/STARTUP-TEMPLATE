import { TAG, Tag } from './tag/tag';
import { BookId } from './book-id/book-id';
import { Book, IBook } from './book';
import { TagList } from './tag/tag-list';

describe('Book', () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // tag
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const tag1 = new Tag({ name: TAG.design });
  const tag2 = new Tag({ name: TAG.ui });
  const tag3 = new Tag({ name: TAG.ops });
  const tagList = new TagList({ tagsList: [tag1, tag2, tag3] });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // props
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const props: IBook = {
    name: 'book1',
    author: 'author',
    tagList: tagList,
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 以下テスト
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  describe('constructor', () => {
    it('createできる', () => {
      const book = Book.create(props);
      expect(book).toEqual(expect.any(Book));
    });
    it('reBuildできる', () => {
      const bookId = BookId.reBuild('43145f95-2034-4fae-b88f-ca0bdf7890bd');
      const book = Book.reBuild(props, bookId);
      expect(book).toStrictEqual(expect.any(Book));
      expect(book.id).toStrictEqual(bookId);
    });

    describe('get()', () => {
      const expected = Book.create(props);
      it('getName()', () => {
        expect(expected.getName()).toStrictEqual(props.name);
      });
      it('getAuthor()', () => {
        expect(expected.getAuthor()).toStrictEqual(props.author);
      });
      it('getTagList()', () => {
        expect(expected.getTagList()).toStrictEqual(props.tagList);
      });
    });
  });
});
