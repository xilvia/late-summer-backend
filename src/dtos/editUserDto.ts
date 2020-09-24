import {
  IsNotEmpty,
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @MinLength(4)
  firstName: string;

  @IsNotEmpty()
  @MinLength(4)
  lastName: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^(?=.*\d*)(?=.*[a-zA-Z]).{4,12}$/)
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
}
