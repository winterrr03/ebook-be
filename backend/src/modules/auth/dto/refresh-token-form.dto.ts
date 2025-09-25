import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenForm } from 'src/modules/auth/domain/refresh-token-form';

export class RefreshTokenFormDto {
  @ApiProperty()
  readonly refreshToken: string;

  public static toRefreshTokenForm(dto: RefreshTokenFormDto): RefreshTokenForm {
    return {
      refreshToken: dto.refreshToken,
    };
  }
}
