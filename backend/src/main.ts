import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from './module/logger/custom-logger.service';
import { firebaseInit } from './infrastructure/firebase/firebase-init';

async function bootstrap() {
  // logger: false モジュール初期化時のログが出力されなくなる
  const app = await NestFactory.create(AppModule, { logger: false });
  const configService = app.get(ConfigService);
  app.useLogger(app.get(CustomLoggerService));
  // todo 環境変数で指定したほうがいいかも
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });
  firebaseInit();
  const port = Number(configService.get('BACKEND_PORT')) || 3001; // Cloud Run の要件。環境変数PORTで起動するように。
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' を追加して外部からのアクセスを受け入れる。
  //
  console.log(`環境:${process.env.NODE_ENV}`);
  console.log(`port:${port.toFixed()}`);
}

bootstrap().catch((e) => console.log(e));
