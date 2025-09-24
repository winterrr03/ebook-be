import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { KeycloakModule } from 'src/modules/keycloak/keycloak.module';
import { JwtStrategy } from 'src/modules/auth/jwt-strategy.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), KeycloakModule],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy],
})
export class AuthModule {}
