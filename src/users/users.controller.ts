import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async findAllUsers(): Promise<User[]> {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  //@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User> {
    try {
      return this.usersService.findUserById(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  //@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.removeUserById(id);
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
