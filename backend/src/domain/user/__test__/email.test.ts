import { IEmail, Email } from '../email';

describe('Email', () => {
  const props: IEmail = { email: 'aaa@gmail.com' };

  describe('constructor()', () => {
    it('emailの形式が正しいのでオブジェクトが生成ができる', () => {
      const email = new Email(props);
      expect(email).toEqual(expect.any(Email));
    });
  });
  it('emailの形式が不正なのでエラーを出力する', () => {
    const props: IEmail = { email: 'aaa@aaagmail.com' };
    expect(new Email(props)).toEqual(expect.any(Email));
  });

  describe('value()', () => {
    it('emailが正しく取得できる', () => {
      const email = new Email(props);
      expect(email.value).toEqual(props.email);
    });
  });
});
