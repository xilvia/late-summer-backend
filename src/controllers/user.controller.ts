import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/entities/UserEntity';
import { UserService } from '../services/userService';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserDto } from '../dtos/userDto';
import { EditUserDto } from '../dtos/editUserDto';
import { AuthUserDto } from 'src/dtos/authUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: EditUserDto,
  ): Promise<UserDto> {
    return await this.userService.editUser(id, editUserDto);
  }

  @Post()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    console.log(createUserDto);
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<{ token: string }> {
    console.log(authUserDto);
    return this.userService.login(authUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.userService.removeUser(id);
  }
}
