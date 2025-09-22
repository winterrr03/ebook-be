import { Module } from '@nestjs/common';
import { BookFavoriteService } from './book-favorite.service';
import { BookFavoriteController } from './book-favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookFavoriteEntity, BookEntity, UserEntity]),
  ],
  controllers: [BookFavoriteController],
  providers: [BookFavoriteService],
})
export class BookFavoriteModule {}
