import { TAG, Tag } from '../../../domain/book/tag/tag';
import { Book } from '../../../domain/book/book';
import { TagList } from '../../../domain/book/tag/tag-list';
import { BookId } from '../../../domain/book/book-id/book-id';

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
    tagList: new TagList({ tagsList: [ui,ops] }),
    author: 'author1',
    isLost: false,
    isPrivate: false,
  },
  BookId.reBuild('abb68dd5-0a50-4c78-2f16-0d32184aac6b'),
);
