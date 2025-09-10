import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookItemDto } from 'src/modules/book/dto/book-item.dto';
import { BookMapper } from 'src/modules/book/mapper/book.mapper';
import { BookDetailDto } from 'src/modules/book/dto/book-detail.dto';
import { CreateBookDto } from 'src/modules/book/dto/book-create.dto';
import { UpdateBookDto } from 'src/modules/book/dto/book-update.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<BookItemDto[]> {
    return BookMapper.toItemDtosFromDomains(await this.bookService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookDetailDto> {
    return BookMapper.toDetailDtoFromDomain(await this.bookService.findOne(id));
  }

  @Post()
  async create(@Body() dto: CreateBookDto): Promise<BookDetailDto> {
    return BookMapper.toDetailDtoFromDomain(
      await this.bookService.create(BookMapper.toDomainFromCreateDto(dto)),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
  ): Promise<BookDetailDto> {
    return BookMapper.toDetailDtoFromDomain(
      await this.bookService.update(
        id,
        BookMapper.toDomainFromUpdateDto(
          dto,
          await this.bookService.findOne(id),
        ),
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookService.remove(id);
  }
}
