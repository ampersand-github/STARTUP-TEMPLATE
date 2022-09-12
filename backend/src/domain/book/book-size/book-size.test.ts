import { BOOK_SIZE_TYPE, BookSize, IBookSize } from './book-size';

describe('BookSize', () => {
  // given:
  const props: IBookSize = {
    value: BOOK_SIZE_TYPE.bigSize,
  };
  // when:
  const expected = new BookSize(props);

  it('construct()', () => {
    // then:
    expect(expected).toStrictEqual(expect.any(BookSize));
  });
  it('get', () => {
    // then:
    expect(expected.value).toStrictEqual(props.value);
  });
});
