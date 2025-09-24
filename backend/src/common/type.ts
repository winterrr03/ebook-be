import { Request } from 'express';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export type Uuid = string & { _uuidBrand: undefined };

export interface AuthenticatedRequest extends Request {
  user?: UserEntity;
}

export interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  refresh_expires_in: number;
  scope: string;
  session_state: string;
}

export interface KeycloakErrorResponse {
  error: string;
  error_description: string;
}
