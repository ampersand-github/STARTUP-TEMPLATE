import { BOOK_SIZE_TYPE, BookSize } from "./book-size";

describe('BookSize', () => {
  it('get', () => {
    // given:
    const props = BOOK_SIZE_TYPE.bigSize
    // when:
    const actual = new BookSize({value:props})
    // then:
    expect(actual.value).toStrictEqual(props);
  });
});
