import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './http-exception-filter/http-exception.filter';

const whitelist = ['http://localhost:8000'];

async function bootstrap() {
  const httpsOptions = getHttpsOptions('massiv-yug.ru');
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT') || 3000;

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(null, false);
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, access-control-allow-origin',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port, () => console.log(`server started on port: ${port}`));
}
bootstrap();

function getHttpsOptions(domain: string) {
  try {
    return {
      key: fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`),
    };
  } catch (error) {
    console.log('Ошибка получения ключей:', error.message);
  }
}
