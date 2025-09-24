import { Uuid } from 'src/common/type';
import { RoleType } from 'src/guards/role-type';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export class User {
  readonly id: Uuid;

  readonly keyCloakId: Uuid | null;

  readonly email: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly role: RoleType;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      keyCloakId: userEntity.keyCloakId,
      email: userEntity.email,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      role: userEntity.role,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }

  static fromEntities(userEntities: UserEntity[]): User[] {
    return userEntities.map((e) => this.fromEntity(e));
  }
}
