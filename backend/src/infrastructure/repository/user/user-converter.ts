import { IPrismaUser } from './user-repository';
import { IUser, User } from 'src/domain/user/user';
import { UserId } from 'src/domain/user/user-id/user-id';
import { BorrowingList } from 'src/domain/user/borrow-list/borrow-list';
import { Borrow } from 'src/domain/book/borrow/borrow';
import { BookId } from 'src/domain/book/book-id/book-id';

export const userConverter = (prismaUser: IPrismaUser): User => {
  const borrows: Borrow[] = prismaUser.borrow_histories.map((one) => {
    return Borrow.create({
      userId: UserId.reBuild(one.user_id),
      bookId: BookId.reBuild(one.book_id),
      startAt: new Date(one.start_at),
      endAt: one.end_at ? new Date(one.start_at) : undefined,
    });
  });

  const borrowingList = new BorrowingList({ borrowList: borrows });

  const props: IUser = {
    name: prismaUser.name,
    borrowingList: borrowingList,
  };

  const userId = UserId.reBuild(prismaUser.id);
  return User.reBuild(props, userId);
};
