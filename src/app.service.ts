import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createUserDto } from './dto/create-user.dto';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  getOne(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
    // You can use the try catch
  }
  createUser(input: createUserDto): Promise<User> {
    const user = this.usersRepository.create(input);
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, input: createUserDto): Promise<User> {
    const user = this.usersRepository.findOne(id);
    if (!user) throw new HttpException('no user', HttpStatus.NOT_FOUND);
    this.usersRepository.update(id, { ...input });
    return this.getOne(id);
  }
  async deleteUser(id: number): Promise<User> {
    const user = await this.getOne(id);
    await this.usersRepository.remove(user);
    return user;
  }
}
