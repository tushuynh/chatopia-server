import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const PORT = app.get(ConfigService).get<number>('PORT');
  await app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
}
bootstrap();
