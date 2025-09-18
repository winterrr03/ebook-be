import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from 'src/modules/bookmark/entity/bookmark.entity';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkEntity, BookEntity, UserEntity])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
