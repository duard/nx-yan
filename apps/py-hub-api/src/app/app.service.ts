import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {
    // console.log('db', db);
  }

  async getUsers(): Promise<any[]> {
    const rows = await this.db.collection('users').find();

    rows.count().then((count) => {
      console.log('contador', count);
    });

    return rows.toArray();
  }

  getData(): { message: string } {
    return { message: 'Welcome to py-hub-api!' };
  }
}
