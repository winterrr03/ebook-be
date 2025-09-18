import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { BookmarkEntity } from 'src/modules/bookmark/entity/bookmark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BookFavoriteEntity, BookmarkEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
