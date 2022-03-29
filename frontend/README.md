# README

## JSX.Element,FC,VFCのいづれかを使うべきか？
A. `JSX.Element`
参考
- [TypeScript React JSX.Element にハマる - かもメモ](https://chaika.hatenablog.com/entry/2021/10/08/083000)
- [【検証】React.FC と React.VFC はべつに使わなくていい説 – KRAY Inc.](https://kray.jp/blog/dont-have-to-use-react-fc-and-react-vfc/)

# ディレクトリ構造について
### pages
- Next.jsはディレクトリ構造そのものがページのURLになる
- ここにはアトミックデザインにおけるページを格納する

### component
- アトミックデザインに準拠する

### infrastructure
- axios
  - axiosに関する情報を格納する
- auth
  - 認証に関する情報を格納する
