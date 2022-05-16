import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Book } from 'src/domain/book/book';
import { IBookRepository } from 'src/domain/book/__interface__/book-repository-interface';
import { BookId } from 'src/domain/book/book-id/book-id';
import {
  books as IPrismaBooks,
  tags as IPrismaTags,
  borrow_histories as IPrismaBorrowHistories,
} from '@prisma/client';
import { bookConverter } from './book-converter';

export type IPrismaBook = IPrismaBooks & {
  tags: IPrismaTags[];
  borrow_histories: {
    start_at: Date;
    end_at: Date | null;
  }[];
};

export class BookRepository implements IBookRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findOne(bookId: BookId): Promise<Book | null> {
    const book: IPrismaBook = await this.prisma.books.findUnique({
      where: { id: bookId.toString() },
      include: {
        tags: true,
        borrow_histories: {
          select: {
            start_at: true,
            end_at: true,
          },
          take: 1,
          orderBy: { start_at: 'desc' },
          where: { end_at: null },
        },
      },
    });
    return book ? bookConverter(book) : null;
  }

  async findAll(): Promise<Book[]> {
    // データの取得
    const allBooks: IPrismaBook[] = await this.prisma.books.findMany({
      include: {
        tags: true,
        // 最新1件を習得、習得できなければnull
        borrow_histories: {
          select: {
            start_at: true,
            end_at: true,
          },
          take: 1,
          orderBy: { start_at: 'desc' },
          where: { end_at: null },
        },
      },
    });
    // データの加工
    console.log('--------');
    console.log(allBooks);
    return allBooks.map((one: IPrismaBook): Book => bookConverter(one));
  }

  async save(entity: Book): Promise<void> {
    const createPrismaTagList = entity
      .getTagList()
      .getCollection()
      .map((one) => {
        return {
          tag_name: one.getValue(),
        };
      });

    await this.prisma.$transaction(async (prisma) => {
      // tagを一旦消してから再度insertする。(delete -> insert)
      await prisma.tags.deleteMany({
        where: { book_id: entity.id.toString() },
      });

      await prisma.books.upsert({
        where: { id: entity.id.toString() },
        include: { tags: true },
        create: {
          id: entity.id.toString(),
          name: entity.getName(),
          author: entity.getAuthor(),
          is_privates: entity.getIsPrivate(),
          is_losting: entity.getIsLost(),
          tags: {
            createMany: {
              data: createPrismaTagList,
            },
          },
        },
        update: {
          name: entity.getName(),
          author: entity.getAuthor(),
          is_privates: entity.getIsPrivate(),
          is_losting: entity.getIsLost(),
          tags: {
            createMany: {
              data: createPrismaTagList,
            },
          },
        },
      });
    });
  }
}
