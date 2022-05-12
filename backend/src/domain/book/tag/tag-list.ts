import { ValueObject } from 'src/domain/__shared__/value-object';
import { Tag } from './tag';

export interface ITagList {
  tags: Tag[];
}

export class TagList extends ValueObject<ITagList> {
  public get values() {
    return this.props.tags.map((one: Tag) => one.value);
  }

  public constructor(props: ITagList) {
    super(props);
  }
}
