import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@core/filters/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins = app.get(ConfigService).get<Array<string>>('origins');
  const PORT = app.get(ConfigService).get<number>('PORT');

  app.enableCors({ origin: origins });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chatopia api example')
    .setDescription('The chatopia api description')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
}
bootstrap();
