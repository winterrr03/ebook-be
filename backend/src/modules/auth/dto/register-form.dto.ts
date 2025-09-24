import { IsEmail, IsString, MinLength } from 'class-validator';
import { RegisterForm } from 'src/modules/auth/domain/register-form';
import _ from 'lodash';

export class RegisterFormDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  public static toRegisterForm(dto: RegisterFormDto): RegisterForm {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: _.toLower(dto.email),
      password: dto.password,
    };
  }
}
