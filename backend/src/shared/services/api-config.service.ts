import { Injectable } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get dbConfig() {
    return {
      host: this.getString('DATABASE_HOST'),
      port: this.getNumber('DATABASE_PORT'),
      username: this.getString('DATABASE_USERNAME'),
      password: this.getString('DATABASE_PASSWORD'),
      database: this.getString('DATABASE_NAME'),
    };
  }

  get keycloakConfig() {
    return {
      clientId: this.getString('KEYCLOAK_CLIENT_ID'),
      clientSecret: this.getString('KEYCLOAK_CLIENT_SECRET'),
      baseUrl: this.getString('KEYCLOAK_BASE_URL'),
      realmName: this.getString('KEYCLOAK_REALM_NAME'),
    };
  }

  get keycloakJwtConfig() {
    const baseUrl = this.keycloakConfig.baseUrl;
    const realmName = this.keycloakConfig.realmName;

    return {
      issuer: `${baseUrl}/realms/${realmName}`,
      jwksUri: `${baseUrl}/realms/${realmName}/protocol/openid-connect/certs`,
      tokenUri: `${baseUrl}/realms/${realmName}/protocol/openid-connect/token`,
    };
  }

  get serverPort(): number {
    return this.getNumber('PORT');
  }

  get apiPrefix(): string {
    return this.getString('API_PREFIX');
  }

  private getNumber(key: string): number {
    const value = this.getString(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value || isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value.trim();
  }
}
