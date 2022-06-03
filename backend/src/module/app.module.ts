import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookController } from '../presentation/controller/book.controller';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PassController } from '../presentation/controller/index.controller';
import { CustomLoggerModule } from './logger/custom-logger.module';
import { StripeModule } from './stripe/stripe.module';
import { StripeController } from '../presentation/controller/stripe.controller';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    CustomLoggerModule,
    StripeModule,
    ConfigModule.forRoot({
      isGlobal: true, // 全てのmoduleで使用できるように
      envFilePath: ENV === 'development' ? '.env.development' : `.env.${ENV}`, // NODE_ENVの値によって読み込むファイルを変更する
    }),
  ],
  controllers: [BookController, PassController, StripeController],
  providers: [PrismaService],
})
export class AppModule {}
