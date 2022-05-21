import { PrismaClient } from '@prisma/client';
import { BookId } from '../../../domain/book/book-id/book-id';
import { UserId } from '../../../domain/user/user-id/user-id';

const bookId1 = BookId.reBuild('ab4f5642-2fed-88db-583e-337a37cc08a4');
const bookId2 = BookId.reBuild('ca1b74f1-09db-4e93-0ba7-a67313d5389d');
const bookId3 = BookId.reBuild('73e3a99f-7f9c-ab02-fc19-47dc498a60f5');
const bookId4 = BookId.reBuild('48510f9f-ae5f-93ed-5cf1-87e59725ac36');
const bookId5 = BookId.reBuild('4014de5e-b006-b003-49a7-234df5cd8ecf');

export const createPrismaBooks = async (prisma: PrismaClient) => {
  await prisma.users.createMany({
    data: [
      { id: bookId1.toString(), name: 'book1' },
      { id: bookId2.toString(), name: 'book2' },
      { id: bookId3.toString(), name: 'book3' },
      { id: bookId4.toString(), name: 'book4' },
      { id: bookId5.toString(), name: 'book5' },
    ],
  });
};
const user1 = UserId.reBuild('83704ff3-3b3e-fe43-fb94-7313f27dfdaf');
export const a = async (prisma: PrismaClient) => {
  await prisma.borrow_histories.createMany({
    data: [
      {
        id: '26e0e9e9-1709-ea99-19a1-4950899ded15',
        user_id: user1.toString(),
        book_id: bookId1.toString(),
        start_at: new Date(),
        end_at: null,
      },
    ],
  });
};

/*

b1879c52-d83a-f141-d5c9-ad405353c612
 */
