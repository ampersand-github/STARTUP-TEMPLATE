import { ValueObject } from 'src/domain/__shared__/value-object';

export const BOOK_SIZE_TYPE = {
  newsPaper: '新聞紙',
  bigSize: 'B4判、A4判、B5判、重箱判、AB判',
  normalSize: 'A5判、菊判、B6判、四六判',
  smallSize: 'A6判、小B６判、三五判',
} as const;

export type BookSizeType = typeof BOOK_SIZE_TYPE[keyof typeof BOOK_SIZE_TYPE];

export interface IBookSize {
  value: BookSizeType;
}

export class BookSize extends ValueObject<IBookSize> {
  public readonly value: BookSizeType;

  public constructor(props: IBookSize) {
    super(props);
    this.value = props.value;
  }
}
