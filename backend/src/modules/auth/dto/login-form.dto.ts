import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginForm } from 'src/modules/auth/domain/login-form';
import _ from 'lodash';

export class LoginFormDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  public static toLoginForm(dto: LoginFormDto): LoginForm {
    return {
      email: _.toLower(dto.email),
      password: dto.password,
    };
  }
}
