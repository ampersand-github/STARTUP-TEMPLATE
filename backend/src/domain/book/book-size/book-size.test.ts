import { BOOK_SIZE_TYPE, BookSize, IBookSize } from './book-size';

describe('BookSize', () => {
  const props: IBookSize = {
    value: BOOK_SIZE_TYPE.bigSize,
  };

  describe('インスタンスの生成', () => {
    const expected = new BookSize(props);
    it('construct()', () => {
      expect(expected).toStrictEqual(expect.any(BookSize));
    });
    it('get', () => {
      expect(expected.value).toStrictEqual(props.value);
    });
  });
});
