import { UserEntity } from 'src/modules/user/entity/user.entity';

export class UserCreate {
  readonly email: string;

  readonly firstName?: string;

  readonly lastName?: string;

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      email: userCreate.email,
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
    };
  }
}
