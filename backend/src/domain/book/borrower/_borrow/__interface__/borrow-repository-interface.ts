import { Borrow } from 'src/domain/book/borrower/_borrow/borrow';
import { UserId } from 'src/domain/user/user-id/user-id';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';

export interface IBorrowRepository {
  findOne(id: OpenBookId): Promise<Borrow | null>;
  findManyByUserId(userId: UserId): Promise<Borrow[]>;
  save(entity: Borrow): Promise<void>;
}
