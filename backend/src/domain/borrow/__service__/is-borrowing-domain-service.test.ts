import { UserId } from 'src/domain/user/user-id/user-id';
import { BookId } from 'src/domain/book/book-id/book-id';
import { Borrow } from 'src/domain/borrow/borrow';
import { Book } from 'src/domain/book/book';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BorrowRepository } from 'src/infrastructure/repository/borrow/borrow-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { isBorrowingDomainService } from 'src/domain/borrow/__service__/is-borrowing-domain-service';

describe('isBorrowingDomainService', () => {
  const borrowRepository = new BorrowRepository(new PrismaService());
  const bookId = BookId.create();
  const book1: Book = Book.reBuild(
    {
      name: 'book1',
      author: 'author',
      tagList: new TagList({ tagsList: [] }),
      isLost: false,
      isPrivate: false,
    },
    bookId,
  );

  const borrowFinish1 = Borrow.create({
    userId: UserId.create(),
    bookId: bookId,
    startAt: new Date(),
    endAt: new Date(),
  });

  const borrowFinish2 = Borrow.create({
    userId: UserId.create(),
    bookId: bookId,
    startAt: new Date(),
    endAt: new Date(),
  });

  const borrowing1 = Borrow.create({
    userId: UserId.create(),
    bookId: bookId,
    startAt: new Date(),
    endAt: undefined,
  });

  it('貸出実績がないので貸出中ではない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findAllByBookId')
      .mockResolvedValue([]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await isBorrowingDomainService({
      book: book1,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(expected).toStrictEqual(false);
  });

  it('貸出中', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findAllByBookId')
      .mockResolvedValue([borrowFinish1, borrowFinish2, borrowing1]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await isBorrowingDomainService({
      book: book1,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(expected).toStrictEqual(true);
  });

  it('貸出がないから借りることができる', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(BorrowRepository.prototype, 'findAllByBookId')
      .mockResolvedValue([borrowFinish1, borrowFinish2]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = await isBorrowingDomainService({
      book: book1,
      borrowR: borrowRepository,
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    expect(expected).toStrictEqual(false);
  });
});
