import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { KeycloakAdminClient } from '@s3pweb/keycloak-admin-client-cjs';
import axios from 'axios';
import { AxiosError } from 'axios';
import { KeycloakErrorResponse, KeycloakTokenResponse } from 'src/common/type';
import { LoginForm } from 'src/modules/auth/domain/login-form';
import { Token } from 'src/modules/auth/domain/token';
import { KeycloakUser } from 'src/modules/keycloak/domain/keycloak-user';
import { ApiConfigService } from 'src/shared/services/api-config.service';

@Injectable()
export class KeycloakService implements OnModuleInit {
  private readonly kcAdminClient: KeycloakAdminClient;

  constructor(private readonly configService: ApiConfigService) {
    this.kcAdminClient = new KeycloakAdminClient(
      this.configService.keycloakConfig,
    );
  }

  async onModuleInit() {
    await this.kcAdminClient.auth({
      grantType: 'client_credentials',
      ...this.configService.keycloakConfig,
    });
  }

  async createUser(user: KeycloakUser) {
    return this.kcAdminClient.users.create({
      email: user.email,
      username: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: true,
      credentials:
        user.password == null
          ? undefined
          : [
              {
                type: 'password',
                value: user.password,
                temporary: false,
              },
            ],
    });
  }

  async login(login: LoginForm): Promise<Token> {
    return await this.requestToken({
      grant_type: 'password',
      username: login.email,
      password: login.password,
    });
  }

  async impersonate(userId: string): Promise<Token> {
    return await this.requestToken({
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      requested_subject: userId,
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<Token> {
    return await this.requestToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
  }

  private async requestToken(body: any): Promise<Token> {
    const response = await this.performTokenRequest(body);

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
      tokenType: response.data.token_type,
      refreshExpiresIn: response.data.refresh_expires_in,
      scope: response.data.scope,
      sessionState: response.data.session_state,
    };
  }

  private async performTokenRequest(body: any) {
    const tokenUri = this.configService.keycloakJwtConfig.tokenUri;
    try {
      return await axios.post<KeycloakTokenResponse>(
        tokenUri,
        {
          client_id: this.configService.keycloakConfig.clientId,
          client_secret: this.configService.keycloakConfig.clientSecret,
          ...body,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        const err = e as AxiosError<KeycloakErrorResponse>;

        if (err.response?.status === 400 || err.response?.status === 401) {
          throw new BadRequestException(err.response.data.error_description);
        }
      }

      throw e;
    }
  }
}
