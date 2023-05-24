import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  const option = new DocumentBuilder()
    .setTitle('rONEDCARD V2')
    .setDescription('rONEDCARD api')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, document);
  app.use(helmet());
  const port = process.env.PORT || 8081;
  await app.listen(port, () => {
    console.log('Hello world listening on port', port);
  });
}
bootstrap();
