import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { environment } from '@nx-yandeh/shared/environments';
import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';
import { AwsVariablesService } from './app/aws-variables.service';

dotenv.config();

async function bootstrap() {
  const params = await AwsVariablesService.getVARs();
  environment.AWS_VARS = params;

  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = Number(process.env.PORT) || 3333;

  await app.listen(port, () => {
    Logger.log(
      process.env.NODE_ENV,
      `🚀 Server running on http://localhost:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
