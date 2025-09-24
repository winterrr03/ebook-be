import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/guards/role-type';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export class CurrentUserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly role: RoleType;

  public static fromUser(user: UserEntity): CurrentUserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
    };
  }
}
