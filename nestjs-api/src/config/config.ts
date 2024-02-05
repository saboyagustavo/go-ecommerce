import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => {
  const replaceEnvVariables = (value: string): string => {
    return value.replace(
      /\${([^}]+)}/g,
      (_, variable) => process.env[variable] || '',
    );
  };

  return {
    api: {
      port: +process.env.API_PORT,
      url: process.env.API_URL,
      httpTimeout: +process.env.API_HTTP_TIMEOUT,
      key: process.env.API_JWT_KEY,
    },
    db: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
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
    rabbitmq: {
      host: process.env.RABBITMQ_HOST,
      port: +process.env.RABBITMQ_PORT,
      user: process.env.RABBITMQ_DEFAULT_USER,
      password: process.env.RABBITMQ_DEFAULT_PASS,
      url: replaceEnvVariables(process.env.RABBITMQ_URL),
    },
  };
};
