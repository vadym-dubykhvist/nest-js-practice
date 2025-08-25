import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('API Documentation for NestJS course')
    .setVersion('1.0.0')
    .setContact('Vadym', 'url', 'vadym@example.com')
    .setLicense('MIT', 'https://github.com')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
    extraModels: [],
    operationIdFactory: (controllerKey, methodKey) =>
      `${controllerKey}-${methodKey}`,
  });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'Nest JS API Docs',
  });

  app.use(Logger);

  await app.listen(3000);
}
bootstrap();
