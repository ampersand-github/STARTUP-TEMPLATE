import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
// import { borrows as IPrismaBorroews} from '@prisma/client';
import { IBorrowRepository } from 'src/domain/borrow/__interface__/borrow-repository-interface';
import { UserId } from 'src/domain/user/user-id/user-id';
import { Borrow } from 'src/domain/borrow/borrow';
import { BookId } from 'src/domain/book/book-id/book-id';
import { BorrowId } from '../../../domain/borrow/borrow-id/borrow-id';

// export type IPrismaUser = IPrismaUsers;

export class BorrowRepository implements IBorrowRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  findAll(): Promise<Borrow[]> {
    return Promise.resolve([]);
  }

  findAllByUserId(userId: UserId): Promise<Borrow[]> {
    return Promise.resolve([]);
  }

  findAllByBookId(bookId: BookId): Promise<Borrow[]> {
    return Promise.resolve([]);
  }

  findOne(id: BorrowId): Promise<Borrow | null> {
    return Promise.resolve(undefined);
  }

  save(entity: Borrow): Promise<void> {
    return Promise.resolve(undefined);
  }
}
