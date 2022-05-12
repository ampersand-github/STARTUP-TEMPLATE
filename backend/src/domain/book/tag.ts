import { ValueObject } from 'src/domain/__shared__/value-object';

export const TAG = {
  tech: '技術書',
  novel: '小説',
  picture: '図鑑',
  bigSize: '大判',
  newBookSize: '新書',
  design:"設計",
  ui:"デザイン",
  ts:"TypeScript",
  ops:"運用",
  java:"Java",
  attitude: "心構え",
  html :"HTML",
  go:"Go"
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
      console.log("aaa")
      throw new Error(`${props.name}のタグが存在しません`);
    }
  }
}
