import { Module } from '@nestjs/common';
import { KeycloakService } from 'src/modules/keycloak/keycloak.service';

@Module({
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {}
