import {
  IBookWithBorrow,
  IBookWithBorrowQS,
} from '../../usecase/book-with-borrow/__interface__/book-with-borrow-qs-interface';
import { PrismaService } from '../prisma/prisma.service';
import { BookId } from '../../domain/book/book-id/book-id';

/*
export type IPrismaBook = IPrismaBooks & {
    tags: IPrismaTags[];
    borrow_histories: {
        start_at: Date;
        end_at: Date | null;
    }[];
};
 */

export class BookWithBorrowQS implements IBookWithBorrowQS {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findAll(): Promise<IBookWithBorrow[]> {
    const a = await this.prisma.books.findMany({
      include: { borrow_histories: {skip:1,orderBy:{start_at:"desc"}} },
    });
    return Promise.resolve(undefined);
  }

  findOne(id: BookId): Promise<IBookWithBorrow | null> {
    return Promise.resolve(undefined);
  }
}
