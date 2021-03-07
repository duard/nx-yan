/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();

import { AppModule } from './app/app.module';
import { AwsVariablesService } from './app/aws-variables.service';
import { environment } from './environments/environment';

async function bootstrap() {
  const params = await AwsVariablesService.getVARs();
  environment.AWS_VARS = params;
  console.log('::: main.ts SSM: Loading environment variables :::\n', environment.AWS_VARS.MONGO_URI);
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
