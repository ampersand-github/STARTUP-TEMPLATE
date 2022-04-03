import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Book, IBook } from 'src/domain/book/book';
import { IBookRepository } from 'src/domain/book/__interface__/book-repository-interface';
import { Tag } from 'src/domain/book/tag';
import { TagList } from 'src/domain/book/tag-list';
import { BookId } from 'src/domain/book/book-id';
import { books as IPrismaBooks ,tags as IPrismaTags} from '@prisma/client';


export type PrismaBook = IPrismaBooks & { tags: IPrismaTags[]; }

export class BookRepository implements IBookRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  // prismaから取得した値を値オブジェクトに変換する
  private converter(prismaBook:PrismaBook):Book {
    const tags: Tag[] = prismaBook.tags.map((one) => {
      return new Tag({ name: one.name });
    });
    const props: IBook = {
      name: prismaBook.name,
      tagList: new TagList({ tags: tags }),
    };
    const bookId = BookId.reBuild(prismaBook.id)
    return Book.reBuild(props,bookId );
  }

  async findAll(): Promise<Book[]> {
    // データの取得
    const allBooks:PrismaBook[] = await this.prisma.books.findMany({
      include: { tags: true },
    });

    // データの加工
    return allBooks.map((one:PrismaBook): Book => {
     return  this.converter(one)
    });
  }

  async findOne(bookId: BookId): Promise<Book> {
    const book:PrismaBook = await this.prisma.books.findUnique({
      where: { id: bookId.toString() },
      include: { tags: true },
    });

    if (!book) {
      throw new Error('idに合致する書籍がありません');
    }

    return this.converter(book);
  }
}
