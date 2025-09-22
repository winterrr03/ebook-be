import { Uuid } from 'src/common/type';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export class User {
  readonly id: Uuid;

  readonly email: string;

  readonly firstName: string | null;

  readonly lastName: string | null;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      email: userEntity.email,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }

  static fromEntities(userEntities: UserEntity[]): User[] {
    return userEntities.map((e) => this.fromEntity(e));
  }
}
