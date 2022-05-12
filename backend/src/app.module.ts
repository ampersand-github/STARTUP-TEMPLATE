import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookController } from './presentation/controller/book.controller';
import {PrismaService} from "./infrastructure/prisma/prisma.service";

const ENV = process.env.NODE_ENV;
console.log(ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全てのmoduleで使用できるように
      envFilePath: ENV === 'development' ? '.env.development' : `.env.${ENV}`, // NODE_ENVの値によって読み込むファイルを変更する
    }),
  ],
  controllers: [BookController],
  providers: [PrismaService],
})
export class AppModule {}
