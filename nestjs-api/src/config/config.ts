import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  api: {
    port: parseInt(process.env.API_PORT),
    url: process.env.API_URL,
    httpTimeout: parseInt(process.env.API_HTTP_TIMEOUT),
    key: process.env.API_KEY,
  },
  db: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
    migrationsTableName: 'migrations',
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
});
