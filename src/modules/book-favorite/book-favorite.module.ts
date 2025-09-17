import { Module } from '@nestjs/common';
import { BookFavoriteService } from './book-favorite.service';
import { BookFavoriteController } from './book-favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { BookEntity } from 'src/modules/book/entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookFavoriteEntity, BookEntity])],
  controllers: [BookFavoriteController],
  providers: [BookFavoriteService],
})
export class BookFavoriteModule {}
