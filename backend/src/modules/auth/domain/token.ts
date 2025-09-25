export class Token {
  readonly accessToken: string;

  readonly expiresIn: number;

  readonly refreshExpiresIn: number;

  readonly refreshToken: string;

  readonly tokenType: string;

  readonly sessionState: string;

  readonly scope: string;
}
