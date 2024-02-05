import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

interface ApiConfigProps {
  port: number;
  url: string;
  httpTimeout: number;
  key: string;
}

interface DbConfigProps extends MysqlConnectionOptions {
  cli: {
    migrationsDir: string;
  };
}

interface RabbitMQConfigProps {
  host: string;
  port: number;
  user: string;
  password: string;
  url: string;
}

export interface ConfigProps {
  api: ApiConfigProps;
  db: DbConfigProps;
  rabbitmq: RabbitMQConfigProps;
}
