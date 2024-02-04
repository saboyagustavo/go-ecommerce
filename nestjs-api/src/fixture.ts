import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import products from './db/products.json';
import users from './db/users.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productsRepo = dataSource.getRepository('Product');
  await productsRepo.save(products);

  const usersRepo = dataSource.getRepository('User');
  await usersRepo.save(users);

  await app.close();
}
bootstrap();
