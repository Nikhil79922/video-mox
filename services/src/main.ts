import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('VideoMox API')
    .setDescription(
      'REST API documentation for VideoMox - a modern video streaming and content management platform.',
    )
    .setVersion('1.0.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(configService.get<number>('port') ?? 3000);
  console.log(
    'Server is running at port ==>',
    configService.get<number>('port'),
  );
}
bootstrap();
