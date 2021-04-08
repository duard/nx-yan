import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ApiDatabaseModule } from '@nx-yandeh/api-database';

@Module({
  imports: [ApiDatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
