import { Module } from '@nestjs/common';
import { ApiDatabaseModule } from '@nx-yandeh/api-database';
import { UsersModule } from '@nx-yandeh/api-users';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsVariablesService } from './aws-variables.service';

@Module({
  imports: [ApiDatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AwsVariablesService],
})
export class AppModule {
  constructor() {
    console.log('APP-MODULE ready');
  }
}
