import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from '../../__shared__/unique-entity-id';

export class BorrowId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'BorrowId');
  }

  public static create(): BorrowId {
    return new BorrowId(uuid());
  }

  public static reBuild(value: string): BorrowId {
    return new BorrowId(value);
  }
}
