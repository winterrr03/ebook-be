import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookFavoriteService } from './book-favorite.service';
import type { Uuid } from 'src/common/type';

@Controller('book-favorites')
export class BookFavoriteController {
  constructor(private readonly bookFavoriteService: BookFavoriteService) {}

  @Post(':bookId')
  async create(@Param('bookId') bookId: Uuid): Promise<void> {
    await this.bookFavoriteService.create(bookId);
  }

  @Delete(':bookId')
  async remove(@Param('bookId') bookId: Uuid): Promise<void> {
    await this.bookFavoriteService.removeByBookId(bookId);
  }
}
