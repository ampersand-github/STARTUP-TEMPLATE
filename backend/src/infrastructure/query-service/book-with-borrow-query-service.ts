import {
  IBookWithBorrow,
  IBookWithBorrowQS,
} from '../../usecase/book-with-borrow/__interface__/book-with-borrow-qs-interface';
import { PrismaService } from '../prisma/prisma.service';
import { BookId } from '../../domain/book/book-id/book-id';
import { borrow_histories as IPrismaBorrow } from '@prisma/client';
import * as omit from 'lodash.omit';
import { bookConverter } from '../repository/book/book-converter';
import { IPrismaBook } from '../repository/book/book-repository';
import { borrowConverter } from '../repository/borrow/borrow-converter';

export type IPrismaBookWithBorrow = IPrismaBook & {
  borrow_histories: IPrismaBorrow[];
};

export class BookWithBorrowQS implements IBookWithBorrowQS {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findAll(): Promise<IBookWithBorrow[]> {
    const bookWithBorrows: IPrismaBookWithBorrow[] =
      await this.prisma.books.findMany({
        include: {
          tags: true,
          borrow_histories: { take: 1, orderBy: { start_at: 'desc' } },
        },
      });

    return bookWithBorrows.map(
      (one: IPrismaBookWithBorrow): IBookWithBorrow => {
        const bookProps: IPrismaBook = omit(one, ['borrow_histories']);
        const book = bookConverter(bookProps);

        if (one.borrow_histories.length === 0)
          return { book: book, borrow: undefined };

        const borrow1 = borrowConverter(one.borrow_histories[0]);
        return { book: book, borrow: borrow1 };
      },
    );
  }

  findOne(id: BookId): Promise<IBookWithBorrow | null> {
    return Promise.resolve(undefined);
  }
}
