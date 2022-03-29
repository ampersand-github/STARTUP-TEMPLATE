import deepEqual from 'deep-equal';
import { IEquatable } from './equatable';

export abstract class ValueObject<T> implements IEquatable {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(other: ValueObject<T>): boolean {
    return deepEqual(this.props, other.props);
  }
}
