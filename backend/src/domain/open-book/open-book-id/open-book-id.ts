import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from 'src/domain/__shared__/unique-entity-id';

export class OpenBookId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'OpenBookId');
  }

  public static create(): OpenBookId {
    return new OpenBookId(uuid());
  }

  public static reBuild(value: string): OpenBookId {
    return new OpenBookId(value);
  }
}
