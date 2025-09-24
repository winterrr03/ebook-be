import { ApiProperty } from '@nestjs/swagger';
import { AuthResult } from 'src/modules/auth/domain/auth-result';
import { CurrentUserDto } from 'src/modules/auth/dto/current-user.dto';
import { TokenDto } from 'src/modules/auth/dto/token.dto';

export class AuthResultDto {
  @ApiProperty()
  readonly token: TokenDto;

  @ApiProperty()
  readonly user: CurrentUserDto;

  public static fromAuthResult(authResult: AuthResult): AuthResultDto {
    return {
      token: TokenDto.fromToken(authResult.token),
      user: CurrentUserDto.fromUser(authResult.user),
    };
  }
}
