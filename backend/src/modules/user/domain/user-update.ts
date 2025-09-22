import { UserEntity } from 'src/modules/user/entity/user.entity';

export class UserUpdate {
  readonly firstName?: string;

  readonly lastName?: string;

  static toEntity(userUpdate: UserUpdate): Partial<UserEntity> {
    return {
      firstName: userUpdate.firstName,
      lastName: userUpdate.lastName,
    };
  }
}
