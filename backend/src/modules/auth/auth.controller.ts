import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterFormDto } from 'src/modules/auth/dto/register-form.dto';
import { AuthResultDto } from 'src/modules/auth/dto/auth-result.dto';
import { LoginFormDto } from 'src/modules/auth/dto/login-form.dto';
import { RefreshTokenFormDto } from 'src/modules/auth/dto/refresh-token-form.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auths')
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterFormDto): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.register(
        RegisterFormDto.toRegisterForm(registerDto),
      ),
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginFormDto): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.login(LoginFormDto.toLoginForm(loginDto)),
    );
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenFormDto: RefreshTokenFormDto,
  ): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.refreshToken(
        RefreshTokenFormDto.toRefreshTokenForm(refreshTokenFormDto),
      ),
    );
  }
}
