import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookController } from './presentation/controller/book/book.controller';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { PassController } from './presentation/controller/pass/index.controller';
import { CustomLoggerModule } from './__shared__/logger/custom-logger.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    CustomLoggerModule,
    ConfigModule.forRoot({
      isGlobal: true, // 全てのmoduleで使用できるように
      envFilePath: ENV === 'development' ? '.env.development' : `.env.${ENV}`, // NODE_ENVの値によって読み込むファイルを変更する
    }),
  ],
  controllers: [BookController, PassController],
  providers: [PrismaService],
})
export class AppModule {}
