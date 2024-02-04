import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  private cleansedResult(u: User) {
    return plainToClass(User, u);
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    const savedUser = await this.userRepo.save(user);
    return this.cleansedResult(savedUser);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map((user) => this.cleansedResult(user));
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOneByOrFail({ id });
    return this.cleansedResult(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepo.delete({ id });
  }
}
