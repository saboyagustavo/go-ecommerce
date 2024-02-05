import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    return this.userRepo.findOneByOrFail({ id });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneByOrFail({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneByOrFail({ id });
    const toSaveUser = this.userRepo.create({
      ...user,
      ...updateUserDto,
    });
    return await this.userRepo.save(toSaveUser);
  }

  remove(id: string) {
    return this.userRepo.delete({ id });
  }
}
