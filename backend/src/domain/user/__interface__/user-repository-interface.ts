import { User } from '../user';
import { UserId } from '../user-id';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: UserId): Promise<User>;
  // register(entity: User): Promise<void>;
  // update(entity: User): Promise<void>;
  // delete(id: UserId): Promise<void>;
}
