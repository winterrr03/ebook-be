import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SharedModule } from 'src/shared/shared.module';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  app.setGlobalPrefix(configService.apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('Ebook API')
    .setDescription('API documentation for Ebook management system')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(configService.serverPort);
}
bootstrap();
