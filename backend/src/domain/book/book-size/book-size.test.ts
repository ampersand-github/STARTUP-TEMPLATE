import { ValueObject } from 'src/domain/__shared__/value-object';

export const BookSizeType = {
  design: '設計',
  ui: 'デザイン',
  ts: 'TypeScript',
  ops: '運用',
  java: 'Java',
  attitude: '心構え',
  html: 'HTML',
  go: 'Go',
} as const;

export type tagType = typeof BookSizeType[keyof typeof BookSizeType];

export interface ITag {
  name: string;
}

export class Tag extends ValueObject<ITag> {
  private readonly value: string;

  public getValue() {
    return this.value;
  }

  public constructor(props: ITag) {
    super(props);
    const tagList = Object.values(BookSizeType);
    if (!tagList.find((plan: tagType) => plan === props.name)) {
      throw new Error(`${props.name}のタグが存在しません`);
    }
    this.value = props.name;
  }
}
