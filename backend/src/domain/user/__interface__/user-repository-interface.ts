import { User } from '../user';
import { UserId } from '../user-id/user-id';

export interface IUserRepository {
  //findAll(): Promise<User[]>;
  findOne(id: UserId): Promise<User | null>;
  save(entity: User): Promise<void>;
}
