import { ApiProperty } from '@nestjs/swagger';
import type { Uuid } from 'src/common/type';
import { BookFavorite } from 'src/modules/book-favorite/domain/book-favorite';
import { BookItemDto } from 'src/modules/book/dto/book-item.dto';

export class BookFavoriteItemDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly id: Uuid;

  @ApiProperty({ type: () => BookItemDto })
  readonly book: BookItemDto;

  @ApiProperty({ example: '2025-09-16T00:00:00Z' })
  readonly createdAt: Date;

  static fromBookFavorite(bookFavorite: BookFavorite): BookFavoriteItemDto {
    return {
      id: bookFavorite.id,
      book: BookItemDto.fromBook(bookFavorite.book),
      createdAt: bookFavorite.createdAt,
    };
  }

  static fromBookFavorites(
    bookFavorites: BookFavorite[],
  ): BookFavoriteItemDto[] {
    return bookFavorites.map((e) => this.fromBookFavorite(e));
  }
}
