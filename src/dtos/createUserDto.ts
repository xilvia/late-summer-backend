import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  firstName: string;

  @IsNotEmpty()
  @MinLength(4)
  lastName: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{4,12}$/)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^ˇ&*-.,<>]).{8,12}/,
    { message: 'password error' },
  )
  password: string;

  @IsNotEmpty()
  @Matches(/^\d+\s[A-z]+\s[A-z]+/, { message: 'address error' })
  address: string;
}
