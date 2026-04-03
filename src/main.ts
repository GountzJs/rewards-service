import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const adminConfig: ServiceAccount = {
    projectId: config.get<string>('FIREBASE_PROJECT_ID'),
    clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
    privateKey: (config.get<string>('FIREBASE_PRIVATE_KEY') as string).replace(
      /\\n/g,
      '\n',
    ),
  };

  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(adminConfig) });
  }

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap().catch((err) => console.error(err));
