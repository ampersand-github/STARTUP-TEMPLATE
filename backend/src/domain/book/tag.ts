import { ValueObject } from 'src/domain/__shared__/value-object';

export const TAG = {
  tech: '技術書',
  novel: '小説',
  picture: '図鑑',
  bigSize: '大判',
  newBookSize: '新書',
} as const;

export type tagType = typeof TAG[keyof typeof TAG];

export interface ITag {
  name: string;
}

export class Tag extends ValueObject<ITag> {
  public get value() {
    return this.props.name;
  }

  public constructor(props: ITag) {
    super(props);
    const tagList = Object.values(TAG);
    if (!tagList.find((plan: tagType) => plan === props.name)) {
      throw new Error('タグが存在しません');
    }
  }
}
