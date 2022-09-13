import { fetchRandomOne } from "./fetch-random-one";

describe('fetchRandomOne', () => {
  it('値を取得できる', () => {
    // given:
    const stringList: string[] = ["a","b","c"]
    // when:
    const expected = fetchRandomOne(stringList)
    // then:
    expect(stringList).toContain(expected)
  });
});
