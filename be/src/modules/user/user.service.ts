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
    return await this.userRepo.find({
      relations: {},
    });
  }

  async findUserById(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async getUserByQuery (query: UserEntity) {
    return await this.userRepo.findOneBy(query);
  };

  async findByUserAndPass(userName: string, password: string) {
    return this.userRepo.findOneBy({
      userName,
      password,
    });
  }

  async createUser(userNew: UserDto) {
    const user = this.userRepo.create(userNew);
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, userUpdate: UserDto) {
    const user = await this.userRepo.findOneBy({ id });
    this.userRepo.merge(user, userUpdate);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    return await this.userRepo.delete(id);
  }
}
