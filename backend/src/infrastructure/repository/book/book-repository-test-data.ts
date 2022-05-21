import { TAG, Tag } from '../../../domain/book/tag/tag';
import { Book } from '../../../domain/book/book';
import { TagList } from '../../../domain/book/tag/tag-list';
import { BookId } from '../../../domain/book/book-id/book-id';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 共通
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ops = new Tag({ name: TAG.ops });
const go = new Tag({ name: TAG.go });
const ui = new Tag({ name: TAG.ui });
const html = new Tag({ name: TAG.html });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// base
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const baseBook = Book.reBuild(
  {
    name: 'ベース',
    tagList: new TagList({ tagsList: [ui, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  BookId.reBuild('0a4c50df-d747-d862-fee3-2698f4f2b624'),
);

export const baseBookUpdate = Book.reBuild(
  {
    name: 'ベースupdate',
    tagList: new TagList({ tagsList: [ui, go] }),
    author: 'author1update',
    isLost: true,
    isPrivate: true,
  },
  BookId.reBuild('0a4c50df-d747-d862-fee3-2698f4f2b624'),
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// タグ情報が0件でも登録できる
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const zeroTagBook = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  BookId.reBuild('abb68dd5-0a50-4c78-2f16-0d32184aac6b'),
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// タグ情報を更新できる(delete/insert)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const WithTagBook = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  BookId.reBuild('abb68dd5-0a50-4c78-2f16-0d32184aac6b'),
);

export const WithTagBookUpdate = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, ui] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  BookId.reBuild('abb68dd5-0a50-4c78-2f16-0d32184aac6b'),
);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 一度も貸し出したことのない書籍を習得できる
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const noBorrowBook = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  BookId.reBuild('ade68483-be87-2f7e-8591-b195c6810fea'),
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 貸出履歴が存在し、その最新の貸出履歴のendAtに値が入っている
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const borrowTestBookId = BookId.reBuild(
  'ade68483-be87-2f7e-8591-b195c6810fea',
);
const userId1 = 'c5bcfba8-ab31-67e7-f139-77dc22219247';
const userId2 = '4c3c31ac-5b28-e7e9-b392-2bf28466572d';
const userId3 = 'c421af0d7-5622-9d9c-7979-94302c4ae055';
export const createPrismaUsers = async (prisma: PrismaClient) => {
  await prisma.users.createMany({
    data: [
      { id: userId1, name: 'user1' },
      { id: userId2, name: 'user2' },
      { id: userId3, name: 'user3' },
    ],
  });
};

export const beforeBorrow = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  borrowTestBookId,
);

export const createPrismaBorrowHistories = async (prisma: PrismaService) => {
  await prisma.borrow_histories.createMany({
    data: [
      {
        id: '326c62c9-7bd7-c2c4-0183-ae165060fe32',
        user_id: userId1,
        book_id: beforeBorrow.id.toString(),
        start_at: new Date('2022-05-14T15:19:44.125Z'),
        end_at: new Date('2022-05-15T15:19:44.125Z'),
      },
      {
        id: '62c83735-44f5-f59b-1c8a-f492648cabbe',
        user_id: userId2,
        book_id: beforeBorrow.id.toString(),
        start_at: new Date('2022-05-16T15:19:44.125Z'),
        end_at: new Date('2022-05-17T15:19:44.125Z'),
      },
      {
        id: '37803b2b-2900-ab11-d33b-cdf7bc252dbe',
        user_id: userId3,
        book_id: beforeBorrow.id.toString(),
        start_at: new Date('2022-05-18T15:19:44.125Z'),
        end_at: new Date('2022-05-19T15:19:44.125Z'),
      },
    ],
  });
};
export const afterUpdate = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  borrowTestBookId,
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 貸出履歴が存在し、その最新の貸出履歴のendAtに値が入っている
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const borrowTestBookId2 = BookId.reBuild(
  'ade68483-be87-2f7e-8591-b195c6810fea',
);
const userId4 = 'c5bcfba8-ab31-67e7-f139-77dc22219247';
const userId5 = '4c3c31ac-5b28-e7e9-b392-2bf28466572d';
const userId6 = 'c421af0d7-5622-9d9c-7979-94302c4ae055';
export const createPrismaUsers2 = async (prisma: PrismaClient) => {
  await prisma.users.createMany({
    data: [
      { id: userId1, name: 'user4' },
      { id: userId2, name: 'user5' },
      { id: userId3, name: 'user6' },
    ],
  });
};

export const beforeBorrow2 = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  borrowTestBookId,
);

export const createPrismaBorrowHistories2 = async (prisma: PrismaService) => {
  await prisma.borrow_histories.createMany({
    data: [
      {
        id: '326c62c9-7bd7-c2c4-0183-ae165060fe32',
        user_id: userId4,
        book_id: beforeBorrow.id.toString(),
        start_at: new Date('2022-05-14T15:19:44.125Z'),
        end_at: new Date('2022-05-15T15:19:44.125Z'),
      },
      {
        id: '62c83735-44f5-f59b-1c8a-f492648cabbe',
        user_id: userId5,
        book_id: beforeBorrow.id.toString(),
        start_at: new Date('2022-05-16T15:19:44.125Z'),
        end_at: new Date('2022-05-17T15:19:44.125Z'),
      },
      {
        id: '37803b2b-2900-ab11-d33b-cdf7bc252dbe',
        user_id: userId6,
        book_id: beforeBorrow.id.toString(),
        start_at: new Date('2022-05-18T15:19:44.125Z'),
        end_at: null,
      },
    ],
  });
};

export const afterUpdate2 = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  borrowTestBookId,
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 貸出履歴を更新することはできない(userリポジトリの情報なので)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const notUpdateBorrowHistoriesBookId = BookId.reBuild(
  '3f19bded-4cc1-2018-8fc9-04e2b22a6f9a',
);
export const notUpdateBorrowHistoriesBook = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ops, go, html] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  notUpdateBorrowHistoriesBookId,
);
