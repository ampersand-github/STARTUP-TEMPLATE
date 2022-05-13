import { ITag, TAG, Tag } from 'src/domain/book/tag/tag';

describe('Tag', () => {

  describe('constructor', () => {
    it('オブジェクトの生成ができる', () => {
      const props: ITag = { name: TAG.ui };
      const tag = new Tag(props);
      expect(tag).toEqual(expect.any(Tag));
    });
    it('存在しないタグを生成しようとするとエラーになる', () => {
      const props: ITag = { name: 'aaa' };
      const actual = () => new Tag(props);
      expect(actual).toThrowError('タグが存在しません');
    });
  });

  describe('get', () => {
    it('値の取得ができる', () => {
      const props: ITag = { name: TAG.ui };
      const tag = new Tag(props);
      expect(tag.getValue()).toEqual(props.name);
    });
  });
});
