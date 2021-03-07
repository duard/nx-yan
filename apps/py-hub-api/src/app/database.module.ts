import 'reflect-metadata';

import { Logger as log, Module } from '@nestjs/common';
import { cyan, white } from '@nx-yandeh/api-shared';
import { Db, Logger, MongoClient } from 'mongodb';

import { environment } from '../environments/environment';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        Logger.setLevel(
          process.env.NODE_ENV === 'development' ? 'error' : 'error'
        );

        const uri = environment.AWS_VARS.MONGO_URI;
        const client = await MongoClient.connect(`${uri}`, {
          useUnifiedTopology: true,
        });

        log.log(`${white}${uri}`, `${cyan}Mongo conected`);

        const db = client.db('portal-dev');

        return db;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
