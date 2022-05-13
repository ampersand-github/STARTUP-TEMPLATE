import { Borrow } from '../../book/borrow/borrow';
import { ValueObject } from '../../__shared__/value-object';

export interface IBorrowingList {
  borrowList: Borrow[];
}

export class BorrowingList extends ValueObject<IBorrowingList> {
  // 5冊まで貸出可能、６冊目はだめ
  private readonly MAX_BORROW_COUNT = 5;
  private readonly collection: ReadonlyArray<Borrow>;

  public getCollection() {
    return this.collection;
  }

  public constructor(props: IBorrowingList) {
    super(props);
    if (props.borrowList.length > this.MAX_BORROW_COUNT)
      throw new Error('貸出は一人5冊までです');
    this.collection = props.borrowList;
  }

  public add(Borrow: Borrow): BorrowingList {
    const borrowList = [...this.collection].concat(Borrow);
    return new BorrowingList({ borrowList: borrowList });
  }

  public remove(Borrow: Borrow): BorrowingList {
    const borrowList = this.collection.filter((one: Borrow) => one !== Borrow);
    return new BorrowingList({ borrowList: borrowList });
  }
}
