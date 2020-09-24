import { User } from 'src/entities/UserEntity';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from '../dtos/userDto';
import { CreateUserDto } from '../dtos/createUserDto';
import { AuthUserDto } from '../dtos/authUserDto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { EditUserDto } from '../dtos/editUserDto';
import * as bcrypt from 'bcryptjs';
import { ValidatorService } from '../services/validator.service';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async postUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.userName = createUserDto.userName;
    user.email = createUserDto.email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(createUserDto.password, user.salt);

    try {
      await user.save();
    } catch (error) {
      console.error(error.stack);

      // if (error.code === '23505') {
      //   throw new ConflictException('Username already exists');
      // } else {
      //   throw new InternalServerErrorException();
      // }
    }
    return user;
  }

  async changePassword() {}

  async updateUser(id: number, editUserDto: EditUserDto): Promise<UserDto> {
    const user = this.findOne(id);
    console.log(id);
    ((await user).id = id),
      ((await user).firstName = editUserDto.firstName),
      ((await user).lastName = editUserDto.lastName),
      ((await user).userName = editUserDto.userName),
      ((await user).email = editUserDto.email),
      ((await user).password = editUserDto.password),
      (await user).save();
    console.log((await user).id, user);
    return user;
  }

  async validateUserPassword(authUserDto: AuthUserDto): Promise<string> {
    const { userName, password } = authUserDto;
    const user = await this.findOne({ userName });

    if (user && (await user.validatePassword(password))) {
      return user.userName;
    } else {
      return null;
    }
  }

  async findUserId(authUserDto: AuthUserDto): Promise<number> {
    const { userName } = authUserDto;
    const user = await this.findOne({ userName });
    const userId = user.id;
    return userId;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
