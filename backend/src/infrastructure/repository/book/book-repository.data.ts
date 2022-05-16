import { TAG, Tag } from '../../../domain/book/tag/tag';
import { UserId } from '../../../domain/user/user-id/user-id';
import { Book, IBook } from '../../../domain/book/book';
import { TagList } from '../../../domain/book/tag/tag-list';
import { IUser, User } from '../../../domain/user/user';
import { BorrowingList } from '../../../domain/user/borrow-list/borrow-list';
import { IBorrow } from '../../../domain/user/borrow/borrow';
import { BookId } from '../../../domain/book/book-id/book-id';
import {LatestBorrow} from "../../../domain/book/latest-borrow/latest-borrow";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 共通
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ops = new Tag({ name: TAG.ops });
const go = new Tag({ name: TAG.go });
const ui = new Tag({ name: TAG.ui });

const minimumBookProps: IBook = {
  name: 'セキュア・バイ・デザイン',
  tagList: new TagList({ tagsList: [] }),
  author: 'author1',
  isLost: false,
  isPrivate: false,
  latestBorrow: undefined,
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const firstBook = Book.reBuild(
  minimumBookProps,
  BookId.reBuild('886949f7-129a-15a4-6775-e8f004617fdd'),
);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const firstBookUpdatePros:IBook = {
  name:"updateName",
  tagList: new TagList({ tagsList: [ops] }),
  author: "updateAuthor",
  isLost: true,
  isPrivate: true,
  //latestBorrow:new LatestBorrow({startAt:new Date(),endAt:new Date()})
}
export const firstBookUpdate = Book.reBuild(
    firstBookUpdatePros,
    BookId.reBuild('886949f7-129a-15a4-6775-e8f004617fdd'),
);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*


abb68dd5-0a50-4c78-2f16-0d32184aac6b
fb4fd546-09de-083a-2507-ad0abd5dad1b
0a4c50df-d747-d862-fee3-2698f4f2b624
ade68483-be87-2f7e-8591-b195c6810fea
3d7c874f-09df-21c8-16dd-4ce316621f32
c5bcfba8-ab31-67e7-f139-77dc22219247
4c3c31ac-5b28-e7e9-b392-2bf28466572d
421af0d7-5622-9d9c-7979-94302c4ae055
 */

/*
const user1Props: IUser = {
  name: 'name1',
  borrowingList: new BorrowingList({ borrowList: [] }),
};

const user1: User = User.reBuild(
  user1Props,
  UserId.reBuild('886949f7-129a-15a4-6775-e8f004617fdd'),
);

await prismaService.users.create({
  data: {
    id: userId1.toString(),
    name: '',
  },
});
 */
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*
const userId1 = UserId.reBuild('25344cca-440f-3ef9-3c83-ab8f9b1b784f');

const baseBookProps: IBook = {
  name: 'セキュア・バイ・デザイン',
  tagList: new TagList({ tagsList: [] }),
  author: 'author1',
  isLost: false,
  isPrivate: false,
  isBorrowing: false,
};

// - -------
const props = {};
const user1 = User.reBuild(
  { name: 'user1', borrowingList: new BorrowingList({ borrowList: [] }) },
  UserId.reBuild('-----.lllk;;l;l;l,l:.:l,'),
);

 */
