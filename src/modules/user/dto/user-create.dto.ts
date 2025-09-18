import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserCreate } from 'src/modules/user/domain/user-create';

export class UserCreateDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  readonly lastName?: string;

  static toUserCreate(userCreateDto: UserCreateDto): UserCreate {
    return {
      email: userCreateDto.email,
      firstName: userCreateDto.firstName,
      lastName: userCreateDto.lastName,
    };
  }
}
