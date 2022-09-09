import { ValueObject } from 'src/domain/__shared__/value-object';
import { Tag } from './tag';

export interface ITagList {
  values: Tag[];
}

export class TagList extends ValueObject<ITagList> {
  public readonly collection: Tag[];

  public constructor(props: ITagList) {
    super(props);
    this.collection = props.values;
  }

  public add(tag: Tag): TagList {
    const tagList = [...this.collection].concat(tag);
    return new TagList({ values: tagList });
  }

  public remove(tag: Tag): TagList {
    const tagList = this.collection.filter((one: Tag) => one !== tag);
    return new TagList({ values: tagList });
  }
}
