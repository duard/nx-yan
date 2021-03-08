import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsVariablesService } from './aws-variables.service';
import { ApiDatabaseModule } from '@nx-yandeh/api-database';
@Module({
  imports: [ApiDatabaseModule],
  controllers: [AppController],
  providers: [AppService, AwsVariablesService],
})
export class AppModule {
  constructor() {
    // console.log('APP-MODULE ready');
  }
}
