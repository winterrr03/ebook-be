import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtDecode } from 'jwt-decode';
import { Uuid } from 'src/common/type';
import { AuthResult } from 'src/modules/auth/domain/auth-result';
import { LoginForm } from 'src/modules/auth/domain/login-form';
import { RefreshTokenForm } from 'src/modules/auth/domain/refresh-token-form';
import { RegisterForm } from 'src/modules/auth/domain/register-form';
import { Token } from 'src/modules/auth/domain/token';
import { TokenPayload } from 'src/modules/auth/domain/token-payload';
import { KeycloakService } from 'src/modules/keycloak/keycloak.service';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(registerForm: RegisterForm): Promise<AuthResult> {
    if (await this.userRepository.findOneBy({ email: registerForm.email })) {
      throw new BadRequestException(
        `Email ${registerForm.email} đã được sử dụng`,
      );
    }

    const { id } = await this.keycloakService.createUser({
      email: registerForm.email,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      password: registerForm.password,
    });

    const user = await this.userRepository.save({
      keyCloakId: id,
      ...registerForm,
    });

    const token = await this.keycloakService.login({
      email: registerForm.email,
      password: registerForm.password,
    });

    return {
      token,
      user,
    };
  }

  async login(login: LoginForm): Promise<AuthResult> {
    return await this.createTokenForUser(
      await this.keycloakService.login(login),
    );
  }

  async refreshToken(refreshTokenForm: RefreshTokenForm): Promise<AuthResult> {
    return await this.createTokenForUser(
      await this.keycloakService.refreshAccessToken(
        refreshTokenForm.refreshToken,
      ),
    );
  }

  private async createTokenForUser(
    token: Token,
    userOptional: Partial<UserEntity> = {},
  ): Promise<AuthResult> {
    const tokenPayload = jwtDecode<TokenPayload>(token.accessToken);

    const user = await this.userRepository.save({
      ...(await this.findOrCreateUser(tokenPayload.sub)),
      ...this.extractUserInfoFromToken(tokenPayload),
      ...userOptional,
    });

    return {
      user,
      token,
    };
  }

  private extractUserInfoFromToken(token: TokenPayload): Partial<UserEntity> {
    return {
      email: token.email,
      firstName: token.given_name,
      lastName: token.family_name,
    };
  }

  private async findOrCreateUser(keyCloakId: Uuid): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      keyCloakId,
    });

    return (
      user ??
      this.userRepository.create({
        keyCloakId,
      })
    );
  }
}
