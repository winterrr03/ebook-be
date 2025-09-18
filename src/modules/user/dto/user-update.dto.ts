import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserUpdate } from 'src/modules/user/domain/user-update';

export class UserUpdateDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  readonly lastName?: string;

  static toUserUpdate(userUpdateDto: UserUpdateDto): UserUpdate {
    return {
      firstName: userUpdateDto.firstName,
      lastName: userUpdateDto.lastName,
    };
  }
}
