export const environment = {
  production: false,
  environment: 'development',
  TIMEZONE: 'America/Sao_Paulo',

  AWS_VARS: null,

  API_TYPEORM_TYPE: process.env.API_TYPEORM_TYPE,
  API_TYPEORM_PORT: process.env.API_TYPEORM_PORT,
  API_TYPEORM_SYNC: process.env.API_TYPEORM_SYNC,

  API_TYPEORM_DATABASE: process.env.API_TYPEORM_DATABASE,
  API_TYPEORM_USERNAME: process.env.API_TYPEORM_USERNAME,
  API_TYPEORM_PASSWORD: process.env.API_TYPEORM_PASSWORD,
  API_TYPEORM_HOSTNAME: process.env.API_TYPEORM_HOSTNAME,

  API_PORT: 3333,
  API_HOST: 'localhost',
  JWT_SECRET: process.env.SECRET,
};
