import { BorrowRepository } from 'src/infrastructure/repository/borrow/borrow-repository';
import { borrowDomainService } from './borrow-domain-service';
import { UserId } from 'src/domain/user/user-id/user-id';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as canAdditionalBorrowDS from './can-additional-borrow-domain-service';
import { OpenBookRepository } from 'src/infrastructure/repository/open-book/open-book-repository';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { OpenBook } from 'src/domain/open-book/open-book';
import { BookId } from 'src/domain/book/book-id/book-id';
import { BorrowId } from 'src/domain/borrow/borrow-id/borrow-id';

describe('borrowDomainService', () => {
  const prisma = new PrismaService();
  const borrowRepository = new BorrowRepository(prisma);
  const openBookRepository = new OpenBookRepository(prisma);
  it('追加で書籍を借りることができない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(canAdditionalBorrowDS, 'canAdditionalBorrowDS')
      .mockResolvedValue(false);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = async () =>
      await borrowDomainService({
        userId: UserId.create(),
        openBookId: OpenBookId.create(),
        borrowR: borrowRepository,
        openBookR: openBookRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(actual).rejects.toThrowError(
      '同時に借りることのできる書籍は5冊までです。',
    );
  });

  it('貸出の書籍を借りることができない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(canAdditionalBorrowDS, 'canAdditionalBorrowDS')
      .mockResolvedValue(true);
    jest.spyOn(openBookRepository, 'findOne').mockResolvedValue(
      OpenBook.create({
        bookId: BookId.create(),
        borrowingId: BorrowId.create(),
      }),
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = async () =>
      await borrowDomainService({
        userId: UserId.create(),
        openBookId: OpenBookId.create(),
        borrowR: borrowRepository,
        openBookR: openBookRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(actual).rejects.toThrowError('この書籍は貸出中です。');
  });

  it('全条件を乗り越えて書籍を借りることができる', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(canAdditionalBorrowDS, 'canAdditionalBorrowDS')
      .mockResolvedValue(true);
    jest.spyOn(BorrowRepository.prototype, 'save').mockResolvedValue();
    jest.spyOn(OpenBookRepository.prototype, 'save').mockResolvedValue();
    jest.spyOn(openBookRepository, 'findOne').mockResolvedValue(
      OpenBook.create({
        bookId: BookId.create(),
        borrowingId: undefined,
      }),
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = async () =>
      await borrowDomainService({
        userId: UserId.create(),
        openBookId: OpenBookId.create(),
        borrowR: borrowRepository,
        openBookR: openBookRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(actual).not.toThrowError();
  });
});
