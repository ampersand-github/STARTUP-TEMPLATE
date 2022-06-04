import { TAG, Tag } from 'src/domain/book/tag/tag';
import { Book } from 'src/domain/book/book';
import { TagList } from 'src/domain/book/tag/tag-list';
import { BookId } from 'src/domain/book/book-id/book-id';

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
    tagList: new TagList({ tagsList: [html, ui] }),
    author: 'author1',
  },
  BookId.reBuild('0a4c50df-d747-d862-fee3-2698f4f2b624'),
);

export const baseBookUpdate = Book.reBuild(
  {
    name: 'ベースupdate',
    tagList: new TagList({ tagsList: [go, ui] }),
    author: 'author1update',
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
  },
  BookId.reBuild('abb68dd5-0a50-4c78-2f16-0d32184aac6b'),
);

export const WithTagBookUpdate = Book.reBuild(
  {
    name: 'セキュア・バイ・デザイン',
    tagList: new TagList({ tagsList: [ui, ops] }),
    author: 'author1',
  },
  BookId.reBuild('abb68dd5-0a50-4c78-2f16-0d32184aac6b'),
);
