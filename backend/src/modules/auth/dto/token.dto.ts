import { Token } from 'src/modules/auth/domain/token';

export class TokenDto {
  readonly accessToken: string;

  readonly expiresIn: number;

  readonly refreshExpiresIn: number;

  readonly refreshToken: string;

  readonly tokenType: string;

  readonly sessionState: string;

  readonly scope: string;

  public static fromToken(token: Token): TokenDto {
    return {
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
      refreshExpiresIn: token.refreshExpiresIn,
      refreshToken: token.refreshToken,
      tokenType: token.tokenType,
      sessionState: token.sessionState,
      scope: token.scope,
    };
  }
}
