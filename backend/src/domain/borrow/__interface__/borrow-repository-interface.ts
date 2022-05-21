import { BookId } from 'src/domain/book/book-id/book-id';
import { Borrow } from '../borrow';
import { UserId } from '../../user/user-id/user-id';

export interface IBorrowRepository {
  findOne(id: BookId): Promise<Borrow | null>;
  findAll(): Promise<Borrow[]>;
  findAllByUserId(userId: UserId): Promise<Borrow[]>;
  findAllByBookId(bookId: BookId): Promise<Borrow[]>;
  save(entity: Borrow): Promise<void>;
}
