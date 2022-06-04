import { UserId } from 'src/domain/user/user-id/user-id';
import { Borrow } from 'src/domain/borrow/borrow';
import { BorrowRepository } from 'src/infrastructure/repository/borrow/borrow-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { canAdditionalBorrowDS } from './can-additional-borrow-domain-service';

describe('maxBorrowLimitDomainService', () => {
  const borrowRepository = new BorrowRepository(new PrismaService());
  const userId = UserId.create();

  const borrowing1 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: undefined,
  });

  const borrowing2 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: undefined,
  });

  const borrowing3 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: undefined,
  });

  const borrowing4 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: undefined,
  });

  const borrowing5 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: undefined,
  });

  const borrowFinish1 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: new Date(),
  });

  const borrowFinish2 = Borrow.create({
    userId: userId,
    openBookId: OpenBookId.create(),
    startAt: new Date(),
    endAt: new Date(),
  });

  it('1冊も借りていない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findManyByUserId')
      .mockResolvedValue([]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await canAdditionalBorrowDS({
      userId: userId,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(expected).toStrictEqual(true);
  });

  it('貸出中4冊なので上限に引っかからない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findManyByUserId')
      .mockResolvedValue([borrowing1, borrowing2, borrowing3, borrowing4]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await canAdditionalBorrowDS({
      userId: userId,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(expected).toStrictEqual(true);
  });

  it('貸出中5冊なので上限に引っかかる', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findManyByUserId')
      .mockResolvedValue([
        borrowing1,
        borrowing2,
        borrowing3,
        borrowing4,
        borrowing5,
      ]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await canAdditionalBorrowDS({
      userId: userId,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(expected).toStrictEqual(false);
  });

  it('貸出中4冊+貸出返却済み2冊なので貸し出せる', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findManyByUserId')
      .mockResolvedValue([
        borrowing1,
        borrowing2,
        borrowing3,
        borrowing4,
        borrowFinish1,
        borrowFinish2,
      ]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await canAdditionalBorrowDS({
      userId: userId,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(expected).toStrictEqual(true);
  });
});
