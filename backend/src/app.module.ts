import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SampleController } from './presentation/controller/sample/sample.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全てのmoduleで使用できるように
      envFilePath: `.env`, // NODE_ENVの値によって読み込むファイルを変更する
    }),
  ],
  controllers: [SampleController],
  providers: [],
})
export class AppModule {}
