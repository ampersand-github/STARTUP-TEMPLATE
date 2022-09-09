import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from 'src/domain/__shared__/unique-entity-id';

export class BookId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'BookId');
  }

  public static construct(): BookId {
    return new BookId(uuid());
  }

  public static reConstruct(value: string): BookId {
    return new BookId(value);
  }
}
