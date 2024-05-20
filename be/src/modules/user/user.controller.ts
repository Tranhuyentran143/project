// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   InternalServerErrorException,
//   NotFoundException,
//   Param,
//   Post,
//   Put,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserDto } from 'src/core/dto/user.dto';
// import { SerializeInterceptor } from 'src/interceptors/serialization.interceptor';
// import { AuthGuard } from 'src/guards/auth.guard';
// import { RoleGuard } from 'src/guards/role.guard';

// @Controller('/api/v1/users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @UseInterceptors(new SerializeInterceptor(UserDto))
//   @Get()
//   async getUser() {
//     try {
//       return await this.userService.findAll();
//     } catch (error) {
//       console.error(error);
//       throw new InternalServerErrorException('Failed to get users');
//     }
//   }

//   @Get('/:id')
//   async getUserById(@Param('id') id: number) {
//     try {
//       const user = await this.userService.findUserById(id);
//       if (!user) {
//         throw new NotFoundException(`User with ID ${id} not found`);
//       }
//       return user;
//     } catch (error) {
//       console.error(error);
//       throw new InternalServerErrorException(`Failed to get user with ID ${id}`);
//     }
//   }

//   @UseGuards(AuthGuard)
//   @UseGuards(RoleGuard)
//   @Post()
//   async createUser(@Body() body: UserDto) {
//     try {
//       return await this.userService.createUser(body);
//     } catch (error) {
//       console.error(error);
//       throw new InternalServerErrorException('Failed to create user');
//     }
//   }

//   @Put('/update/:id')
//   async updateUser(@Param('id') id: number, @Body() user: UserDto) {
//     try {
//       return await this.userService.updateUser(id, user);
//     } catch (error) {
//       console.error(error);
//       throw new InternalServerErrorException(`Failed to update user with ID ${id}`);
//     }
//   }

//   @Delete('/delete/:id')
//   async deleteUser(@Param('id') id: number) {
//     try {
//       return await this.userService.deleteUser(id);
//     } catch (error) {
//       console.error(error);
//       throw new InternalServerErrorException(`Failed to delete user with ID ${id}`);
//     }
//   }
// }

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
import { RoleGuard } from 'src/guards/role.guard';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Get()
  async getUser() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: 'Failed to get users' };
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        return { statusCode: 404, message: `User with ID ${id} not found` };
      }
      return user;
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: `Failed to get user with ID ${id}` };
    }
  }
  // @UseGuards(AuthGuard)
  // @UseGuards(RoleGuard)
  @Post()
  async createUser(@Body() body: UserDto) {
    try {
      return await this.userService.createUser(body);
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: 'Failed to create user' };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Put('/update/:id')
  async updateUser(@Param('id') id: number, @Body() user: UserDto) {
    try {
      return await this.userService.updateUser(id, user);
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: `Failed to update user with ID ${id}`,
      };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: number) {
    try {
      await this.userService.deleteUser(id);
      return { statusCode: 200, message: 'User successfully deleted' };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: `Failed to delete user with ID ${id}`,
      };
    }
  }
}
