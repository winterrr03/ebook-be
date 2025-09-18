import { ApiProperty } from '@nestjs/swagger';
import type { Uuid } from 'src/common/type';
import { User } from 'src/modules/user/domain/user';

export class UserDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly id: Uuid;

  @ApiProperty({ example: 'user@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'John' })
  readonly firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  readonly lastName: string | null;

  static fromUser(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  static fromUsers(users: User[]): UserDto[] {
    return users.map((u) => this.fromUser(u));
  }
}
