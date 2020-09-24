import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/UserEntity';
import { EditUserDto } from '../dtos/editUserDto';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserDto } from '../dtos/userDto';
import { UserRepository } from '../repository/userRepository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/dtos/authUserDto';
import { JwtPayload } from 'src/jwt/jwt-payload.interface';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: number): Promise<UserDto> {
    return await this.userRepository.findOne(id);
  }

  public async editUser(
    id: number,
    editUserDto: EditUserDto,
  ): Promise<UserDto> {
    return await this.userRepository.updateUser(id, editUserDto);
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userRepository.postUser(createUserDto);
  }

  public async removeUser(id: number): Promise<void> {
    console.log(`id: ${id} deleted`);
    await this.userRepository.delete(id);
  }

  public async login(
    authUserDto: AuthUserDto,
  ): Promise<{ token: string; expiresIn: string; userId: number }> {
    const userName = await this.userRepository.validateUserPassword(
      authUserDto,
    );
    if (!userName) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = this.userRepository.findUserId(authUserDto);
    const userId = await user;

    const expiresIn = process.env.JWT_SECRET || '3600';
    const payload: JwtPayload = { userName };
    const token = this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(
        payload,
      )}, ${expiresIn}, ${userId}`,
    );
    return { token, expiresIn, userId };
  }

  
}
