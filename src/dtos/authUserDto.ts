import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^(?=.*\d*)(?=.*[a-zA-Z]).{4,12}$/)
  userName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^ˇ&*-.,<>]).{8,12}/,
    { message: 'password error' },
  )
  password: string;
}
