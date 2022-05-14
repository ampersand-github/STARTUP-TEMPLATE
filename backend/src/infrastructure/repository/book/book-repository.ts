import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Book } from 'src/domain/book/book';
import { IBookRepository } from 'src/domain/book/__interface__/book-repository-interface';
import { BookId } from 'src/domain/book/book-id/book-id';
import {
  books as IPrismaBooks,
  tags as IPrismaTags,
  lostings as IPrismaLostings,
  privates as IPrismaPrivates,
  borrow_histories as IPrismaBorrowHistories,
} from '@prisma/client';
import { bookConverter } from './book-converter';

export type IPrismaBook = IPrismaBooks & {
  tags: IPrismaTags[];
  lostings: IPrismaLostings;
  privates: IPrismaPrivates;
  borrow_histories: IPrismaBorrowHistories[];
};

export class BookRepository implements IBookRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findOne(bookId: BookId): Promise<Book | null> {
    const book = await this.prisma.books.findUnique({
      where: { id: bookId.toString() },
      include: {
        tags: true,
        lostings: true,
        privates: true,
        borrow_histories: true,
      },
    });
    return book ? bookConverter(book) : null;
  }

  async findAll(): Promise<Book[]> {
    // データの取得
    const allBooks: IPrismaBook[] = await this.prisma.books.findMany({
      include: {
        tags: true,
        lostings: true,
        privates: true,
        borrow_histories: true,
      },
    });
    // データの加工
    return allBooks.map((one: IPrismaBook): Book => bookConverter(one));
  }

  /*
    export type booksCreateInput = {
    id: string
    name: string
    author: string
    updated_at?: Date | string
    created_at?: Date | string
    tags?: tagsCreateNestedManyWithoutBooksInput
    lostings?: lostingsCreateNestedOneWithoutBooksInput
    privates?: privatesCreateNestedOneWithoutBooksInput
    borrow_histories?: borrow_historiesCreateNestedManyWithoutBooksInput
  }
   */
  async register(entity: Book): Promise<void> {
    await this.prisma.books.create({
      data: {
        id: entity.id.toString(),
        name: entity.getName(),
        author: entity.getAuthor(),
      },
    });
    await this.prisma.tags.createMany({
      data: entity
        .getTagList()
        .getCollection()
        .map((one) => {
          return {
            tag_name: one.getValue(),
            book_id: entity.id.toString(),
          };
        }),
    });
    if (entity.getIsLost()) {
      await this.prisma.lostings.create({
        data: {
          book_id: entity.id.toString(),
        },
      });
    }
    if (entity.getIsPrivate()) {
      await this.prisma.privates.create({
        data: {
          book_id: entity.id.toString(),
        },
      });
    }
    if (entity.getLatestBorrow()) {
      await this.prisma.borrow_histories.create({
        data: {
          user_id: entity.getLatestBorrow().getUserId().toString(),
          book_id: entity.id.toString(),
          start_at: entity.getLatestBorrow().getStartAt(),
          end_at: entity.getLatestBorrow().getEndAt(),
        },
      });
    }
  }
}
