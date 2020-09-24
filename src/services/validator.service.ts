import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/userRepository';
import { AuthUserDto } from '../dtos/authUserDto';

@Injectable()
export class ValidatorService {
  constructor(private userRepository: UserRepository) {}

  async checkIfUsernameAlreadyExists(authUserDto: AuthUserDto) {
    const { userName } = authUserDto;
    const checkIfExists = await this.userRepository.findOne({ userName });
    if (checkIfExists) {
      return console.error('username exitsts');
    }
  }
}
