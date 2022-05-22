import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Book } from 'src/domain/book/book';
import { IBookRepository } from 'src/domain/book/__interface__/book-repository-interface';
import { BookId } from 'src/domain/book/book-id/book-id';
import { books as IPrismaBooks, tags as IPrismaTags } from '@prisma/client';
import { bookConverter } from './book-converter';

export type IPrismaBook = IPrismaBooks & {
  tags: IPrismaTags[];
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
      },
    });
    return book ? bookConverter(book) : null;
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
