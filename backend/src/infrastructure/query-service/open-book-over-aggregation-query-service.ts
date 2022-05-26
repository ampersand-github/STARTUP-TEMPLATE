import { IBookWithBorrowQS } from '../../usecase/book-with-borrow/__interface__/book-with-borrow-qs-interface';
import { PrismaService } from '../prisma/prisma.service';
import { IOpenBookOAQS } from '../../usecase/open-book-over-aggregation/__interface__/open-book-OAQS-interface';
import { IOpenBookOA } from '../../usecase/open-book-over-aggregation/__interface__/open-book-OA-interface';
import { OpenBookId } from '../../domain/open-book/open-book-id/open-book-id';
import { open_books as IPrismaOpenBook } from '@prisma/client';

import { IPrismaBorrow } from '../repository/borrow/borrow-repository';
import { borrowConverter } from '../repository/borrow/borrow-converter';
import { bookConverter } from '../repository/book/book-converter';
import { IPrismaBook } from '../repository/book/book-repository';

export type IPrismaOpenBookOAQS = IPrismaOpenBook & {
  books: IPrismaBook;
  borrow_histories: IPrismaBorrow;
};

export class OpenBookOAQS implements IOpenBookOAQS {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  private static converter(one: IPrismaOpenBookOAQS): IOpenBookOA {
    return {
      id: OpenBookId.reBuild(one.id),
      book: bookConverter(one.books),
      borrowing: one.borrow_histories
        ? borrowConverter(one.borrow_histories)
        : undefined,
    };
  }

  async findAll(): Promise<IOpenBookOA[]> {
    const all: IPrismaOpenBookOAQS[] = await this.prisma.open_books.findMany({
      include: {
        books: { include: { tags: true } },
        borrow_histories: true,
      },
    });
    return all.map((one: IPrismaOpenBookOAQS) => OpenBookOAQS.converter(one));
  }

  async findMany(ids: OpenBookId[]): Promise<IOpenBookOA[]> {
    const idStrings: string[] = ids.map((one: OpenBookId) => one.toString());
    const many: IPrismaOpenBookOAQS[] = await this.prisma.open_books.findMany({
      where: {
        id: { in: idStrings },
      },
      include: {
        books: { include: { tags: true } },
        borrow_histories: true,
      },
    });
    return many.map((one: IPrismaOpenBookOAQS) => OpenBookOAQS.converter(one));
  }

  async findOne(id: OpenBookId): Promise<IOpenBookOA | null> {
    const one: IPrismaOpenBookOAQS | null =
      await this.prisma.open_books.findUnique({
        where: { id: id.toString() },
        include: {
          books: { include: { tags: true } },
          borrow_histories: true,
        },
      });
    return one ? OpenBookOAQS.converter(one) : null;
  }
}
