import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from 'src/domain/__shared__/unique-entity-id';

export class BorrowerId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'BorrowerId');
  }

  public static create(): BorrowerId {
    return new BorrowerId(uuid());
  }

  public static reConstruct(value: string): BorrowerId {
    return new BorrowerId(value);
  }
}
