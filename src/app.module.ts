import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/userService';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/userRepository';
import { UserModule } from './module/userModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'lateSummer',
      entities: [__dirname + '/**/*Entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
