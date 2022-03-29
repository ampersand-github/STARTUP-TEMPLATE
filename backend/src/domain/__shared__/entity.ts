import { IEquatable } from './equatable';
import { UniqueEntityId } from './unique-entity-id';

export abstract class Entity<T, U extends UniqueEntityId>
  implements IEquatable
{
  private readonly _props: T;
  private readonly _id: U;

  protected constructor(_props: T, _id: U) {
    this._props = _props;
    this._id = _id;
  }

  public get id(): U {
    return this._id;
  }

  protected get props(): T {
    return this._props;
  }

  public equals(object: Entity<T, U>): boolean {
    if (this === object) {
      return true;
    }
    return this.id.equals(object.id);
  }
}
