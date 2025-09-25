import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticatedRequest, Uuid } from 'src/common/type';
import { emptyUuid } from 'src/constants/uuid';
import { RoleType } from 'src/guards/role-type';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { Repository } from 'typeorm';

export const guestUser: Partial<UserEntity> = {
  id: emptyUuid,
  keyCloakId: emptyUuid,
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: 'Guest',
  lastName: 'Guest',
  email: 'Guest',
  role: RoleType.GUEST,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(
    config: ApiConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      ignoreExpiration: false,
      algorithms: ['RS256'],
      jwtFromRequest: JwtStrategy.jwtFromRequest,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.keycloakJwtConfig.jwksUri,
      }),
    });
  }

  authenticate(req: AuthenticatedRequest, options?: any) {
    const token = JwtStrategy.jwtFromRequest(req);

    if (!token) {
      req.user = guestUser as UserEntity;
      this.success(guestUser);

      return;
    }

    super.authenticate(req, options);
  }

  public async validate(args: IJwtPayload): Promise<UserEntity | null> {
    const userId = args.sub as Uuid;

    return await this.userRepository.findOneBy({
      keyCloakId: userId,
    });
  }
}

interface IJwtPayload {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
