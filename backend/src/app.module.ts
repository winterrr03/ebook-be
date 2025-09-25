import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { BookContentModule } from './modules/book-content/book-content.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { BookFavoriteModule } from './modules/book-favorite/book-favorite.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggingExceptionFilter } from 'src/filter/error-handling-exception-filter';
import { JwtAuthGuard } from 'src/decorator/jwt-auth-guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';
import { KeycloakModule } from 'src/modules/keycloak/keycloak.module';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useClass: TypeOrmConfigService,
      inject: [ApiConfigService],
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return (
          getDataSourceByName('default') ||
          addTransactionalDataSource(await new DataSource(options).initialize())
        );
      },
    }),
    ScheduleModule.forRoot(),
    BookModule,
    BookContentModule,
    BookmarkModule,
    BookFavoriteModule,
    UserModule,
    AuthModule,
    KeycloakModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
