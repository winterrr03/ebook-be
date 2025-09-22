import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { BookContentModule } from './modules/book-content/book-content.module';
import typeorm from './config/typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { BookFavoriteModule } from './modules/book-favorite/book-favorite.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return configService.get<TypeOrmModuleOptions>('typeorm')!;
      },
    }),
    ScheduleModule.forRoot(),
    BookModule,
    BookContentModule,
    BookmarkModule,
    BookFavoriteModule,
    UserModule,
  ],
})
export class AppModule {}
