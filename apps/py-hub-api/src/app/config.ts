import { join } from 'path';

import { environment } from './../environments/environment';

export const config = () => ({
  name: '>>> [NX] Yandeh Hub API',
  port: Number(process.env.API_PORT),
  host: process.env.API_HOST,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: environment.API_TYPEORM_TYPE || 'mysql',
    port: Number(environment.API_TYPEORM_PORT),
    synchronize: environment.API_TYPEORM_SYNC,

    database: environment.API_TYPEORM_DATABASE,
    username: environment.API_TYPEORM_USERNAME,
    password: environment.API_TYPEORM_PASSWORD,
    host: environment.API_TYPEORM_HOSTNAME,

    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
      'libs/typeorm/src/lib/entity/**/*.entity{.ts,.js}',
      'libs/lib-api-cruds/src/lib/entity/**/*.entity{.ts,.js}',
      join(__dirname, './**/*.entity{.ts,.js}'),
      '../../../../../libs/lib-api-cruds/src/lib/*.entity{.ts,.js}',
      'src/**/**.entity{.ts,.js}',
      '../../../../libs/api-pessoas/src/lib/*.entity{.ts,.js}'
    ],
    // logging: 'all',
    autoLoadEntities: true,
    logging: false
  }
});