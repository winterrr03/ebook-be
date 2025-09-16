import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookFavoriteService } from './book-favorite.service';
import { BookFavoriteItemDto } from 'src/modules/book-favorite/dto/book-favorite-item.dto';
import { BookFavoriteCreateDto } from 'src/modules/book-favorite/dto/book-favorite-create.dto';
import type { Uuid } from 'src/common/type';

@Controller('book-favorites')
export class BookFavoriteController {
  constructor(private readonly bookFavoriteService: BookFavoriteService) {}

  @Get()
  async findAll(): Promise<BookFavoriteItemDto[]> {
    return BookFavoriteItemDto.fromBookFavorites(
      await this.bookFavoriteService.findAll(),
    );
  }

  @Post()
  async create(
    @Body() bookFavoriteCreateDto: BookFavoriteCreateDto,
  ): Promise<BookFavoriteItemDto> {
    return BookFavoriteItemDto.fromBookFavorite(
      await this.bookFavoriteService.create(
        BookFavoriteCreateDto.toBookFavoriteCreate(bookFavoriteCreateDto),
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: Uuid): Promise<void> {
    await this.bookFavoriteService.remove(id);
  }
}
