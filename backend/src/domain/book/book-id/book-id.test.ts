import { BookId } from 'src/domain/book/book-id/book-id';

describe('BookId', () => {
  it('construct()', () => {
    // given:
    // when:
    // then:
    expect(BookId.construct()).toEqual(expect.any(BookId));
  });
  it('reConstruct()', () => {
    // given:
    // when:
    // then:
    expect(BookId.reConstruct('test-id')).toEqual(expect.any(BookId));
  });
});
