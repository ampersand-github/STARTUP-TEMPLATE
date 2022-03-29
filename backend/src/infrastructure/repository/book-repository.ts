import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Book, IBook } from 'src/domain/book/book';
import { IBookRepository } from 'src/domain/book/__interface__/book-repository-interface';
import { Tag } from 'src/domain/book/tag';
import { TagList } from 'src/domain/book/tag-list';
import { BookId } from 'src/domain/book/book-id';

export class BookRepository implements IBookRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  async findAll(): Promise<Book[]> {
    const allBooks = await this.prisma.books.findMany({
      include: { tags: true },
    });

    return allBooks.map((one): Book => {
      const bookId: BookId = BookId.reBuild(one.id);
      const tags: Tag[] = one.tags.map((one) => {
        return new Tag({ name: one.name });
      });
      const props: IBook = {
        name: one.name,
        tagList: new TagList({ tags: tags }),
      };
      return Book.reBuild(props, bookId);
    });
  }

  async findOne(bookId: BookId): Promise<Book> {
    const book = await this.prisma.books.findUnique({
      where: { id: bookId.toString() },
      include: { tags: true },
    });

    if (!book) {
      throw new Error('idに合致する書籍がありません');
    }

    const tags: Tag[] = book.tags.map((one) => {
      return new Tag({ name: one.name });
    });
    const props: IBook = {
      name: book.name,
      tagList: new TagList({ tags: tags }),
    };
    return Book.reBuild(props, bookId);
  }
}
