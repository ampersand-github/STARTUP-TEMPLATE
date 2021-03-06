import { BorrowRepository } from 'src/infrastructure/repository/borrow/borrow-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { OpenBookRepository } from 'src/infrastructure/repository/open-book/open-book-repository';
import { OpenBook } from 'src/domain/open-book/open-book';
import { BookId } from 'src/domain/book/book-id/book-id';
import { BorrowId } from 'src/domain/borrow/borrow-id/borrow-id';
import { Borrow } from 'src/domain/borrow/borrow';
import { UserId } from 'src/domain/user/user-id/user-id';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import {
  IReturnDomainService,
  returnDomainService,
} from './return-domain-service';

describe('returnDomainService', () => {
  const prisma = new PrismaService();
  const borrowRepository = new BorrowRepository(prisma);
  const openBookRepository = new OpenBookRepository(prisma);

  it('書籍が見つかりません', async () => {
    jest.spyOn(OpenBookRepository.prototype, 'findOne').mockResolvedValue(null);

    const props: IReturnDomainService = {
      openBookId: OpenBookId.create(),
      borrowR: borrowRepository,
      openBookR: openBookRepository,
    };
    const actual = async () => await returnDomainService(props);

    await expect(actual).rejects.toThrowError('書籍が見つかりません');
  });

  it('この書籍は貸し出されていません', async () => {
    jest.spyOn(OpenBookRepository.prototype, 'findOne').mockResolvedValue(
      OpenBook.create({
        bookId: BookId.create(),
        borrowingId: undefined,
      }),
    );

    const props: IReturnDomainService = {
      openBookId: OpenBookId.create(),
      borrowR: borrowRepository,
      openBookR: openBookRepository,
    };
    const actual = async () => await returnDomainService(props);

    await expect(actual).rejects.toThrowError('この書籍は貸し出されていません');
  });

  it('登録できる', async () => {
    jest.spyOn(OpenBookRepository.prototype, 'findOne').mockResolvedValue(
      OpenBook.create({
        bookId: BookId.create(),
        borrowingId: BorrowId.create(),
      }),
    );
    jest.spyOn(BorrowRepository.prototype, 'findOne').mockResolvedValue(
      Borrow.create({
        userId: UserId.create(),
        openBookId: OpenBookId.create(),
        startAt: new Date(),
        endAt: null,
      }),
    );
    jest.spyOn(OpenBookRepository.prototype, 'save').mockResolvedValue();
    jest.spyOn(BorrowRepository.prototype, 'save').mockResolvedValue();

    const props: IReturnDomainService = {
      openBookId: OpenBookId.create(),
      borrowR: borrowRepository,
      openBookR: openBookRepository,
    };
    const actual = async () => await returnDomainService(props);

    await expect(actual).not.toThrowError();
  });
});
