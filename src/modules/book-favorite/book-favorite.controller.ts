import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookFavoriteService } from './book-favorite.service';
import { BookFavoriteCreateDto } from 'src/modules/book-favorite/dto/book-favorite-create.dto';
import type { Uuid } from 'src/common/type';

@Controller('book-favorites')
export class BookFavoriteController {
  constructor(private readonly bookFavoriteService: BookFavoriteService) {}

  @Post()
  async create(
    @Body() bookFavoriteCreateDto: BookFavoriteCreateDto,
  ): Promise<void> {
    await this.bookFavoriteService.create(
      BookFavoriteCreateDto.toBookFavoriteCreate(bookFavoriteCreateDto),
    );
  }

  @Delete(':bookId')
  async remove(@Param('bookId') bookId: Uuid): Promise<void> {
    await this.bookFavoriteService.removeByBookId(bookId);
  }
}
