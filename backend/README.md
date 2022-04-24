# backend

## 動かし方
```.shell
cd backend
npm run docker:start
npm run start:dev
```


## テストの仕方
動かし方のコマンドを打ったあと
```.shell
cd backend
npm run test:watch
```

### テストどうする？
- backend
  - domain
    - 単体テスト
  - usecase
    - 単体テスト
    - DBはmockDBを用意する
  - repository
    - 単体テスト
    - prisma含めたテスト
  - controller
    - 結合テスト
    - requestからresponseまで
    - DBはmockしない
- frontend
  - ビジュアルリグレッションテスト
    - seedを使う
  - e2eテスト
    - seedを使う
- その他
  - 普通に動作確認
    - seeder
  - storybook
