import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookItemDto } from 'src/modules/book/dto/book-item.dto';
import { BookDetailDto } from 'src/modules/book/dto/book-detail.dto';
import type { Uuid } from 'src/common/type';
import { BookCreateDto } from 'src/modules/book/dto/book-create.dto';
import { BookUpdateDto } from 'src/modules/book/dto/book-update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<BookItemDto[]> {
    return BookItemDto.fromBooks(await this.bookService.findAll());
  }

  @Get('search')
  async search(@Query('keyword') keyword: string): Promise<BookItemDto[]> {
    return BookItemDto.fromBooks(
      await this.bookService.searchByTitleOrContent(keyword),
    );
  }

  @Get('favorites')
  async findFavorites(): Promise<BookItemDto[]> {
    return BookItemDto.fromBooks(await this.bookService.findFavorites());
  }

  @Get(':id')
  async findOne(@Param('id') id: Uuid): Promise<BookDetailDto> {
    return BookDetailDto.fromBook(await this.bookService.findOne(id));
  }

  @Post()
  async create(@Body() bookCreateDto: BookCreateDto): Promise<BookItemDto> {
    return BookItemDto.fromBook(
      await this.bookService.create(BookCreateDto.toBookCreate(bookCreateDto)),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: Uuid,
    @Body() bookUpdateDto: BookUpdateDto,
  ): Promise<BookItemDto> {
    return BookItemDto.fromBook(
      await this.bookService.update(
        id,
        BookUpdateDto.toBookUpdate(bookUpdateDto),
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: Uuid): Promise<void> {
    await this.bookService.remove(id);
  }
}
