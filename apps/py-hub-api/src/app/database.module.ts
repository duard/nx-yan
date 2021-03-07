import { Module } from '@nestjs/common';
import { Db, Logger, MongoClient } from 'mongodb';
import { environment } from '../environments/environment';
import 'reflect-metadata';
// const AWS = require('aws-sdk')
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        
        Logger.setLevel(
          process.env.NODE_ENV === 'development' ? 'error' : 'error'
        );

        const uri = environment.AWS_VARS.MONGO_URI;
        console.log(0, '=======================');
        console.log(uri);
        console.log(1, '=======================');
        // uri = uri.substring(uri.indexOf('@') + 1, uri.lastIndexOf('/'));

        console.log(`mongodb://${uri}`);
        console.log(2, '=======================');

        // const url = `mongodb://${uri}`;

        // eslint-disable-next-line no-useless-catch
        try {
          const client = await MongoClient.connect(`${uri}`, {
            useUnifiedTopology: true,
          });

          console.log(3, '=======================');
          const db = client.db('portal-dev');

          console.log(
            '\x1b[32m',
            `::: Database: Connected to mongo at ${uri} :::`,
            '\x1b[32m'
          );
          console.log(4, '=======================');

          return db;
        } catch (e) {
          console.log('ERROR MONGOCLIENT CONNECT\n', e);
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
