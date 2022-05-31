// 英字と数字と記号が最低1文字必要
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/;
export const passwordRule = {
  required: 'パスワードを入力してください。',
  minLength: {
    value: 8,
    message: 'パスワードは8文字以上で入力してください',
  },
  pattern: {
    value: passwordPattern,
    message: '英字と数字と記号を組み合わせたパスワードを設定してください',
  },
};
