import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repository/userRepository';
import { UserService } from 'src/services/userService';
import { UserController } from 'src/controllers/user.controller';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import * as config from 'config';

const jwtConfig = config.get('jwt');


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],

  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
