import { IPrismaBorrow } from './borrow-repository';
import { borrowConverter } from './borrow-converter';
import { UserId } from 'src/domain/user/user-id/user-id';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';

describe('borrowConverter', () => {
  process.env.DATABASE_URL =
    'postgresql://sample_root:sample_password@localhost:5432/dev_db';
  const borrowId = '2422c514-4b06-aced-5ef3-3f869d299bd8';

  it('コンバートできる(end_atに値がある)', () => {
    const props1: IPrismaBorrow = {
      id: borrowId,
      open_book_id: '36a1da7e-c252-3d3e-559c-853cccef677d',
      user_id: 'ff442a52-9d19-f96d-b27c-3b88a8e0ce6f',
      start_at: new Date(),
      end_at: new Date(),
    };

    const actual = borrowConverter(props1);
    expect(actual.id.toString()).toStrictEqual(borrowId);
    expect(actual.getOpenBookId()).toStrictEqual(
      OpenBookId.reBuild(props1.open_book_id),
    );
    expect(actual.getUserId()).toStrictEqual(UserId.reBuild(props1.user_id));
    expect(actual.getStartAt()).toStrictEqual(props1.start_at);
    expect(actual.getEndAt()).toStrictEqual(props1.end_at);
  });
  it('コンバートできる(end_atがnull)', () => {
    const props2: IPrismaBorrow = {
      id: borrowId,
      open_book_id: '36a1da7e-c252-3d3e-559c-853cccef677d',
      user_id: 'ff442a52-9d19-f96d-b27c-3b88a8e0ce6f',
      start_at: new Date(),
      end_at: null,
    };

    const actual = borrowConverter(props2);
    expect(actual.id.toString()).toStrictEqual(borrowId);
    expect(actual.getOpenBookId()).toStrictEqual(
      OpenBookId.reBuild(props2.open_book_id),
    );
    expect(actual.getUserId()).toStrictEqual(UserId.reBuild(props2.user_id));
    expect(actual.getStartAt()).toStrictEqual(props2.start_at);
    expect(actual.getEndAt()).toStrictEqual(undefined); // nullじゃないよ
  });
});
