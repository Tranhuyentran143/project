import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/core/dto/user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialization.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get()
  async getUser() {
    return await this.userService.findAll();
  };

  @Get()
  async getUserById (id: number) {
    return await this.userService.findUserById(id);
  };

  @Post()
  async createUser(@Body() body: UserDto) {
    return await this.userService.createUser(body);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() body: UserDto) {
    return await this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
