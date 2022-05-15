import { TAG, Tag } from './tag/tag';
import { BookId } from './book-id/book-id';
import { Book, IBook } from './book';
import { TagList } from './tag/tag-list';
import { Borrow } from './borrow/borrow';
import { UserId } from '../user/user-id/user-id';

describe('Book', () => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // tag
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const tag1 = new Tag({ name: TAG.design });
  const tag2 = new Tag({ name: TAG.ui });
  const tag3 = new Tag({ name: TAG.ops });
  const tagList = new TagList({ tagsList: [tag1, tag2, tag3] });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // borrow
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const borrow = Borrow.create({
    bookId: BookId.create(),
    userId: UserId.create(),
    startAt: new Date(),
    endAt: new Date(),
  });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // props
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const props: IBook = {
    name: 'book1',
    author: 'author',
    tagList: tagList,
    isLost: false,
    isPrivate: false,
    latestBorrow: borrow,
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
      expect(book).toEqual(expect.any(Book));
      expect(book.id).toStrictEqual(bookId);
    });
  });
});
