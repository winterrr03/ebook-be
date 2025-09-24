import { Token } from 'src/modules/auth/domain/token';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export class AuthResult {
  readonly token: Token;

  readonly user: UserEntity;
}
