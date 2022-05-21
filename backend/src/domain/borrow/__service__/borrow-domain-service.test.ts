import { BorrowRepository } from '../../../infrastructure/repository/borrow/borrow-repository';
import { borrowDomainService } from './borrow-domain-service';
import { UserId } from '../../user/user-id/user-id';
import { Book } from '../../book/book';
import { TagList } from '../../book/tag/tag-list';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { BookId } from '../../book/book-id/book-id';
import * as canUserAdditionalBorrowDomainService from './can-user-additional-borrow-domain-service';
import * as isBorrowingDomainService from './is-borrowing-domain-service';

describe('borrowDomainService', () => {
  const borrowRepository = new BorrowRepository(new PrismaService());

  it('閉架書籍なので貸し出せない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テストデータ
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const userId = UserId.create();
    const bookId = BookId.create();
    const book: Book = Book.reBuild(
      {
        name: 'name',
        author: 'author',
        tagList: new TagList({ tagsList: [] }),
        isLost: false,
        isPrivate: true, // ここ
      },
      bookId,
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = async () =>
      await borrowDomainService({
        userId: userId,
        book: book,
        borrowR: borrowRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(expected).rejects.toThrowError(
      'この書籍は閉架にあり、貸し出すことができません。',
    );
  });

  it('紛失中なので貸し出せない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テストデータ
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const userId = UserId.create();
    const bookId = BookId.create();
    const book: Book = Book.reBuild(
      {
        name: 'name',
        author: 'author',
        tagList: new TagList({ tagsList: [] }),
        isLost: true, // ここ
        isPrivate: false,
      },
      bookId,
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = async () =>
      await borrowDomainService({
        userId: userId,
        book: book,
        borrowR: borrowRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(expected).rejects.toThrowError(
      'この書籍は紛失中の書籍です。カウンターで紛失解除の手続きしてください。',
    );
  });

  it('追加で書籍を借りることができない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(
        canUserAdditionalBorrowDomainService,
        'canUserAdditionalBorrowDomainService',
      )
      .mockResolvedValue(false);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テストデータ
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const userId = UserId.create();
    const bookId = BookId.create();
    const book: Book = Book.reBuild(
      {
        name: 'name',
        author: 'author',
        tagList: new TagList({ tagsList: [] }),
        isLost: false,
        isPrivate: false,
      },
      bookId,
    );
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = async () =>
      await borrowDomainService({
        userId: userId,
        book: book,
        borrowR: borrowRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(expected).rejects.toThrowError(
      '同時に借りることのできる書籍は5冊までです。',
    );
  });

  it('貸出の書籍を借りることができない', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(
        canUserAdditionalBorrowDomainService,
        'canUserAdditionalBorrowDomainService',
      )
      .mockResolvedValue(true);
    jest
      .spyOn(isBorrowingDomainService, 'isBorrowingDomainService')
      .mockResolvedValue(true);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テストデータ
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const userId = UserId.create();
    const bookId = BookId.create();
    const book: Book = Book.reBuild(
      {
        name: 'name',
        author: 'author',
        tagList: new TagList({ tagsList: [] }),
        isLost: false,
        isPrivate: false,
      },
      bookId,
    );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = async () =>
      await borrowDomainService({
        userId: userId,
        book: book,
        borrowR: borrowRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(expected).rejects.toThrowError('この書籍は貸出中です。');
  });

  it('全条件を乗り越えて書籍を借りることができる', async () => {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  jest
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    jest
      .spyOn(
        canUserAdditionalBorrowDomainService,
        'canUserAdditionalBorrowDomainService',
      )
      .mockResolvedValue(true);
    jest
      .spyOn(isBorrowingDomainService, 'isBorrowingDomainService')
      .mockResolvedValue(false);
    jest.spyOn(BorrowRepository.prototype, 'save').mockResolvedValue();

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テストデータ
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const userId = UserId.create();
    const bookId = BookId.create();
    const book: Book = Book.reBuild(
      {
        name: 'name',
        author: 'author',
        tagList: new TagList({ tagsList: [] }),
        isLost: false,
        isPrivate: false,
      },
      bookId,
    );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  ロジック
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const expected = async () =>
      await borrowDomainService({
        userId: userId,
        book: book,
        borrowR: borrowRepository,
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  テスト
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    await expect(expected).not.toThrowError();
  });
});
