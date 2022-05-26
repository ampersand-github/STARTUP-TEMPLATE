import { BorrowRepository } from '../../../infrastructure/repository/borrow/borrow-repository';
import { borrowDomainService } from './borrow-domain-service';
import { UserId } from '../../user/user-id/user-id';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { BookId } from '../../book/book-id/book-id';
import * as canAdditionalBorrowDS from './can-additional-borrow-domain-service';
import { OpenBook } from '../../open-book/open-book';
import { BorrowId } from '../borrow-id/borrow-id';
import { OpenBookRepository } from '../../../infrastructure/repository/open-book/open-book-repository';

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
        openBook: OpenBook.create({
          bookId: BookId.create(),
          borrowingId: undefined,
        }),
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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = async () =>
      await borrowDomainService({
        userId: UserId.create(),
        openBook: OpenBook.create({
          bookId: BookId.create(),
          borrowingId: BorrowId.create(),
        }),
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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const actual = async () =>
      await borrowDomainService({
        userId: UserId.create(),
        openBook: OpenBook.create({
          bookId: BookId.create(),
          borrowingId: undefined,
        }),
        borrowR: borrowRepository,
        openBookR: openBookRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(actual).not.toThrowError();
  });
});
