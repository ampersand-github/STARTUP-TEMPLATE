import { ValueObject } from 'src/domain/__shared__/value-object';
import { Tag } from './tag';

export interface ITagList {
  tagsList: Tag[];
}

export class TagList extends ValueObject<ITagList> {
  private readonly collection: ReadonlyArray<Tag>;

  public getCollection() {
    return this.collection;
  }

  public constructor(props: ITagList) {
    super(props);
    this.collection = props.tagsList;
  }

  /*
  public add(tag: Tag): TagList {
    const tagList = [...this.collection].concat(tag);
    return new TagList({ tagsList: tagList });
  }

  public remove(tag: Tag): TagList {
    const tagList = this.collection.filter((one: Tag) => one !== tag);
    return new TagList({ tagsList: tagList });
  }
 */
}
