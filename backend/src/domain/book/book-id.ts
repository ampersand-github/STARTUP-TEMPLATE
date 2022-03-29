import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from '../__shared__/unique-entity-id';

export class BookId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'BookId');
  }

  public static create(): BookId {
    return new BookId(uuid());
  }

  public static reBuild(value: string): BookId {
    return new BookId(value);
  }
}
