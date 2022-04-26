import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //
  const port = Number(configService.get('BACKEND_PORT')) || 3001; // Cloud Run の要件。環境変数PORTで起動するように。
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' を追加して外部からのアクセスを受け入れる。
  console.log(configService.get('BACKEND_PORT'));
}

bootstrap().catch((e) => console.log(e));
