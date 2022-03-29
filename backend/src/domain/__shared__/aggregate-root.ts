import { Entity } from './entity';
import { UniqueEntityId } from './unique-entity-id';

export abstract class AggregateRoot<T, U extends UniqueEntityId> extends Entity<
  T,
  U
> {}
