import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import type { Uuid } from 'src/common/type';
import { BookFavoriteCreate } from 'src/modules/book-favorite/domain/book-favorite-create';

export class BookFavoriteCreateDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  @IsUUID('4', { message: 'bookId phải là UUID hợp lệ' })
  readonly userId: Uuid;

  static toBookFavoriteCreate(
    bookFavoriteCreateDto: BookFavoriteCreateDto,
  ): BookFavoriteCreate {
    return {
      userId: bookFavoriteCreateDto.userId,
    };
  }
}
