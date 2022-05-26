import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IOpenBookRepository } from '../../../domain/open-book/__interface__/open-book-repository-interface';
import { OpenBookId } from '../../../domain/open-book/open-book-id/open-book-id';
import { OpenBook } from '../../../domain/open-book/open-book';
import { open_books } from '@prisma/client';
import { openBookConverter } from './open-book-converter';

export type IPrismaOpenBook = open_books;

export class OpenBookRepository implements IOpenBookRepository {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  private async isBookExist(bookId: string) {
    const bookCount = await this.prisma.books.count({
      where: { id: bookId },
    });
    if (bookCount === 0) throw new Error('書籍が存在していません');
  }

  private async isBorrowExist(borrowId: string) {
    const borrowCount = await this.prisma.borrow_histories.count({
      where: { id: borrowId },
    });
    if (borrowCount === 0) throw new Error('貸出情報が存在していません');
  }

  async findOne(id: OpenBookId): Promise<OpenBook | null> {
    const openBook: IPrismaOpenBook = await this.prisma.open_books.findUnique({
      where: { id: id.toString() },
    });
    return openBook ? openBookConverter(openBook) : null;
  }

  async save(entity: OpenBook): Promise<void> {
    // 更新処理前のチェック
    await this.isBookExist(entity.getBookId().toString());
    if (entity.getBorrowingId()) {
      await this.isBorrowExist(entity.getBorrowingId().toString());
    }
    // 処理
    await this.prisma.open_books.upsert({
      where: { id: entity.id.toString() },
      create: {
        id: entity.id.toString(),
        book_id: entity.getBookId().toString(),
        borrow_histories_id: entity.getBorrowingId()
          ? entity.getBorrowingId().toString()
          : null,
      },
      update: {
        book_id: entity.getBookId().toString(),
        borrow_histories_id: entity.getBorrowingId()
          ? entity.getBorrowingId().toString()
          : null,
      },
    });
  }
}
