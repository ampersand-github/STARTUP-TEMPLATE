import { BOOK_SIZE_TYPE, BookSize, IBookSize } from '../book-size/book-size';

describe('BookSize', () => {
  it('オブジェクトを生成して値を取得できる', () => {
    const props: IBookSize = { value: BOOK_SIZE_TYPE.normalSize };
    const bookSize = new BookSize(props);
    expect(bookSize.value).toStrictEqual(BOOK_SIZE_TYPE.normalSize);
  });
});
