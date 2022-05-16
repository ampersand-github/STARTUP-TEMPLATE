import { truncateAllTable } from 'src/infrastructure/__shared__/truncate-all-table';
import { UserRepository } from './user-repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Book, IBook } from '../../../domain/book/book';
import { TagList } from '../../../domain/book/tag/tag-list';
import { TAG, Tag } from '../../../domain/book/tag/tag';
import { UserId } from '../../../domain/user/user-id/user-id';
import { BookRepository } from '../book/book-repository';
import { IUser, User } from '../../../domain/user/user';
import { BorrowingList } from '../../../domain/user/borrow-list/borrow-list';

const ops = new Tag({ name: TAG.ops });
const go = new Tag({ name: TAG.go });
const ui = new Tag({ name: TAG.ui });

const baseBookProps: IBook = {
  name: 'book1',
  tagList: new TagList({ tagsList: [ops] }),
  author: 'author1',
  isLost: false,
  isPrivate: false,
  latestBorrow: undefined,
};
const book1 = Book.create(baseBookProps);
const book2props: IBook = {
  ...baseBookProps,
  name: 'book2',
  author: 'author2',
};
const book2 = Book.create(book2props);
const book3props: IBook = {
  ...baseBookProps,
  name: 'book3',
  author: 'author3',
};
const book3 = Book.create(book3props);
const book4props: IBook = {
  ...baseBookProps,
  name: 'book4',
  author: 'author4',
};
const book4 = Book.create(book4props);
const book5props: IBook = {
  ...baseBookProps,
  name: 'book5',
  author: 'author5',
};
const book5 = Book.create(book5props);
const book6props: IBook = {
  ...baseBookProps,
  name: 'book6',
  author: 'author6',
};
const book6 = Book.create(book6props);

describe('userRepository', () => {
  const prismaService = new PrismaService();
  const userRepository = new UserRepository(prismaService);
  const bookRepository = new BookRepository(prismaService);
  beforeEach(async () => {
    await truncateAllTable(prismaService);
    await bookRepository.register(book1);
    await bookRepository.register(book2);
    await bookRepository.register(book3);
    await bookRepository.register(book4);
    await bookRepository.register(book5);
    await bookRepository.register(book6);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('save', () => {
    test('最小限の書籍データを登録できる', async () => {
      const userId = UserId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      await prismaService.users.create({
        data: { id: userId.toString(), name: 'user1' },
      });
      await prismaService.borrow_histories.createMany({
        data: {
          user_id: userId.toString(),
          book_id: book1.id.toString(),
          start_at: new Date(),
          end_at: null,
        },
      });
    });
  });
  /*
    describe('register', () => {
      test('登録できる', async () => {
        const userId = UserId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
        const props: IUser = {
          name: 'name1',
          borrowingList: new BorrowingList({ borrowList: [] }),
        };
        const user = User.reBuild(props, userId);
        userRepository.resister();
      });
    });
 */
});
/*
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const userId = userId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const user = user.reBuild(baseuserProps, userId);
      await userRepository.register(user);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await userRepository.findOne(userId);
      expect(actual).toStrictEqual(user);
     */

/*
    describe('findAll', () => {
      test('データが１件もない', async () => {
        const result = await userRepository.findAll();
        expect(result).toEqual([]);
      });
      test('正常に全件取得できる', async () => {
        // - - - - - - - - - - - - - - - - - - - - - - - -
        // データを登録
        // - - - - - - - - - - - - - - - - - - - - - - - -
        const userId1 = userId.reBuild('a38da2c1-051f-e126-441d-0b091d04f12d');
        const userId2 = userId.reBuild('7ce4e7da-746b-0653-5985-61942e473cab');
        const userId3 = userId.reBuild('dc789002-f0df-fcf3-94c9-d1e9c670a1b4');
        const user1 = user.reBuild(baseuserProps, userId1);
        const user2 = user.reBuild(baseuserProps, userId2);
        const user3 = user.reBuild(baseuserProps, userId3);
        await userRepository.register(user1);
        await userRepository.register(user2);
        await userRepository.register(user3);
        // - - - - - - - - - - - - - - - - - - - - - - - -
        // テスト
        // - - - - - - - - - - - - - - - - - - - - - - - -
        const actual = await userRepository.findAll();
        expect(actual).toStrictEqual([user1, user2, user3]);
      });
    });
  });
  */

/*
      describe('update', () => {
    test('userを更新できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const userId = userId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const user = user.reBuild(baseuserProps, userId);
      await userRepository.register(user);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const updateProps: Iuser = {
        ...baseuserProps,
        name: 'updatedName',
        author: 'updateAuthor',
        isPrivate: true,
        isLost: true,
      };
      const updateuser = user.reBuild(updateProps, userId);
      await userRepository.update(updateuser);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await userRepository.findOne(user.id);
      expect(actual).not.toStrictEqual(user);
      expect(actual).toStrictEqual(updateuser);
    });

     */

/*

    test('タグを更新(追加、削除)できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const userId = userId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const withTagProps = {
        ...baseuserProps,
        tagList: new TagList({ tagsList: [go, ops] }),
      };
      const user = user.reBuild(withTagProps, userId);
      await userRepository.register(user);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const updateTagProps = {
        ...baseuserProps,
        tagList: new TagList({ tagsList: [go, ui] }),
      };
      const updateuser = user.reBuild(updateTagProps, userId);
      await userRepository.update(updateuser);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await userRepository.findOne(user.id);
      expect(actual).not.toStrictEqual(user);
      expect(actual).toStrictEqual(updateuser);
    });
     */

/*

    test('最初の一人目が書籍を借りることができる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const userId = userId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const user = user.reBuild(baseuserProps, userId);
      await userRepository.register(user);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const firstBorrowProps = {
        ...baseuserProps,
        latestBorrow: new LatestBorrow({
          userId: userId,
          userId: userId1,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: undefined,
        }),
      };
      const updateuser = user.reBuild(firstBorrowProps, userId);
      await userRepository.update(updateuser);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await userRepository.findOne(user.id);
      expect(actual).not.toStrictEqual(user);
      expect(actual).toStrictEqual(updateuser);
    });

     */

/*

    test('借りている書籍を返却できる', async () => {
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // データを登録
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const userId = userId.reBuild('2422c514-4b06-aced-5ef3-3f869d299bd8');
      const borrowingProps = {
        ...baseuserProps,
        latestBorrow: new LatestBorrow({
          userId: userId,
          userId: userId1,
          startAt: new Date('2022-05-14T12:31:02.522Z'),
          endAt: undefined,
        }),
      };
      const user = user.reBuild(borrowingProps, userId);
      await userRepository.register(user);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // 上記で登録したデータの更新
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const returnProps = {
        ...baseuserProps,
        latestBorrow: new LatestBorrow({
          userId: borrowingProps.latestBorrow.getuserId(),
          userId: borrowingProps.latestBorrow.getUserId(),
          startAt: borrowingProps.latestBorrow.getStartAt(),
          endAt: new Date('2022-05-18T17:31:02.522Z'),
        }),
      };
      const updateuser = user.reBuild(returnProps, userId);
      await userRepository.update(updateuser);
      // - - - - - - - - - - - - - - - - - - - - - - - -
      // テスト
      // - - - - - - - - - - - - - - - - - - - - - - - -
      const actual = await userRepository.findOne(user.id);
      expect(actual).not.toStrictEqual(user);
      expect(actual).toStrictEqual(updateuser);
    });
  });
     */
