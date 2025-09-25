import { Uuid } from 'src/common/type';

export interface TokenPayload {
  readonly exp: number;

  readonly iat: number;

  readonly jti: string;

  readonly iss: string;

  readonly sub: Uuid;

  readonly typ: string;

  readonly azp: string;

  readonly sid: string;

  readonly acr: string;

  readonly allowed_origins: string[];

  readonly realm_access: {
    roles: string[];
  };

  readonly scope: string;

  readonly email_verified: boolean;

  readonly name: string;

  readonly preferred_username: string;

  readonly given_name: string;

  readonly family_name: string;

  readonly email: string;
}
