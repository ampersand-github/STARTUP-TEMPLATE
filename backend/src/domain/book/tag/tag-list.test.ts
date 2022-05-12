import { Tag } from 'src/domain/book/tag/tag';
import { ITagList, TagList } from './tag-list';

describe('TagList', () => {
  const tag1 = new Tag({ name: '技術書' });
  const tag2 = new Tag({ name: '小説' });
  const tag3 = new Tag({ name: '図鑑' });
  const props: ITagList = { tags: [tag1, tag2, tag3] };

  describe('constructor()', () => {
    it('オブジェクトの生成ができる', () => {
      const tagList = new TagList(props);
      expect(tagList).toEqual(expect.any(TagList));
    });
  });

  describe('get', () => {
    const tagList = new TagList(props);
    it('値の取得ができる', () => {
      expect(tagList.values).toEqual([tag1.value, tag2.value, tag3.value]);
    });
  });
});
