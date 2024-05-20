import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/core/dto/user.dto';
import { UserEntity } from 'src/core/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findUserById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getUserByQuery(query: UserEntity) {
    return await this.userRepo.findOneBy(query);
  }

  async findByUserAndPass(userName: string, password: string) {
    return this.userRepo.findOne({
      where: {
        userName,
        password,
      },
    });
  }

  async createUser(userNew: UserDto) {
    
    const user = this.userRepo.create(userNew);
    console.log(user);
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, userDto: UserDto) {
    console.log(id);

    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, userDto);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    console.log(id);

    return await this.userRepo.delete(id);
  } 
  
}

