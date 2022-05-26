import { Borrow } from '../borrow';
import { UserId } from '../../user/user-id/user-id';
import { OpenBookId } from '../../open-book/open-book-id/open-book-id';

export interface IBorrowRepository {
  findOne(id: OpenBookId): Promise<Borrow | null>;
  findManyByUserId(userId: UserId): Promise<Borrow[]>;
  save(entity: Borrow): Promise<void>;
}
