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
        borrow_histories: true,
      },
    });
    // データの加工
    return allBooks.map((one: IPrismaBook): Book => bookConverter(one));
  }

  async register(entity: Book): Promise<void> {
    await this.prisma.books.create({
      data: {
        id: entity.id.toString(),
        name: entity.getName(),
        author: entity.getAuthor(),
        is_privates:entity.getIsPrivate(),
        is_losting:entity.getIsLost()
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

  async update(entity: Book): Promise<void> {
    const id = entity.id.toString();
    // idを消すと外部キーで繋がっているレコードがカスケードで削除されてしまうのでそれはしない。
    // しかしただの値であれば削除してから新規作成する
    await this.prisma.books.update({
      where: { id: id },
      data: {
        name: entity.getName(),
        author: entity.getAuthor(),
        is_privates:entity.getIsPrivate(),
        is_losting:entity.getIsLost()
      },
    });

    await this.prisma.tags.deleteMany({ where: { book_id: id } });
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

    await this.prisma.borrow_histories.upsert({
      where: {
        book_id_user_id_start_at: {
          book_id: id,
          user_id: entity.getLatestBorrow().getUserId().toString(),
          start_at: entity.getLatestBorrow().getStartAt()
        }
      },
      create: {
          user_id: entity.getLatestBorrow().getUserId().toString(),
          book_id: entity.id.toString(),
          start_at: entity.getLatestBorrow().getStartAt(),
          end_at: entity.getLatestBorrow().getEndAt(),
      },
      update: {
        user_id: entity.getLatestBorrow().getUserId().toString(),
        book_id: entity.id.toString(),
        start_at: entity.getLatestBorrow().getStartAt(),
        end_at: entity.getLatestBorrow().getEndAt(),
      }
    })
    }
}
