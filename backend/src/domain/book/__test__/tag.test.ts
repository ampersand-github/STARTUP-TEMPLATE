import { ITag, TAG, Tag } from 'src/domain/book/tag';

describe('Tag', () => {
  const props: ITag = { name: TAG.tech };

  describe('constructor', () => {
    it('オブジェクトの生成ができる', () => {
      const tag = new Tag(props);
      expect(tag).toEqual(expect.any(Tag));
    });
    it('存在しないタグを生成しようとするとエラーになる', () => {
      const props: ITag = { name: 'aaa' };
      const result = () => new Tag(props);
      expect(result).toThrowError('タグが存在しません');
    });
  });

  describe('get', () => {
    const tag = new Tag(props);
    it('値の取得ができる', () => {
      expect(tag.value).toEqual(props.name);
    });
  });
});
