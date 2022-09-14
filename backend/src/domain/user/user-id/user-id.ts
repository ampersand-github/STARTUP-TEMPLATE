import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from 'src/domain/__shared__/unique-entity-id';

export class UserId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'UserId');
  }

  public static construct(): UserId {
    return new UserId(uuid());
  }

  public static reConstruct(value: string): UserId {
    return new UserId(value);
  }
}
