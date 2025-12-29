import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Verão Maior PR.GOV')
    .setDescription(
      'Agendamento simples para banhistas que desejam curtir os espaços SECID neste verão.',
    )
    .setVersion('0.3')
    .addTag('User')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('veraomaior-api', app, documentFactory);
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://veraomaior-secid.firebaseapp.com',
      'https://verao-maior-app.vercel.app',
      'https://veraomaior-secid.web.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(port);
}

void bootstrap();
