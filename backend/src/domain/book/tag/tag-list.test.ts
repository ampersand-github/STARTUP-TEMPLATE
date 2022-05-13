import { TAG, Tag } from 'src/domain/book/tag/tag';
import { ITagList, TagList } from './tag-list';

describe('TagList', () => {
  const tag1 = new Tag({ name: TAG.ui });
  const tag2 = new Tag({ name: TAG.ops });
  const tag3 = new Tag({ name: TAG.design });
  const props: ITagList = { tagsList: [tag1, tag2, tag3] };
  const tagList = new TagList(props);

  describe('constructor()', () => {
    it('オブジェクトの生成ができる', () => {
      expect(tagList).toEqual(expect.any(TagList));
    });
  });

  describe('getCollection', () => {
    const collection = tagList.getCollection();
    expect(collection).toEqual(expect.arrayContaining([tag1, tag2, tag3]));
  });
});
