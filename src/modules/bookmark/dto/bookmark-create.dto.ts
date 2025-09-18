import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';
import type { Uuid } from 'src/common/type';
import { BookmarkCreate } from 'src/modules/bookmark/domain/bookmark-create';

export class BookmarkCreateDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  @IsUUID('4', { message: 'bookId phải là UUID hợp lệ' })
  readonly bookId: Uuid;

  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  @IsUUID('4', { message: 'bookId phải là UUID hợp lệ' })
  readonly userId: Uuid;

  @ApiProperty({ example: 10 })
  @IsInt({ message: 'page phải là số nguyên' })
  @Min(1, { message: 'page phải lớn hơn hoặc bằng 1' })
  readonly page: number;

  static toBookmarkCreate(
    bookmarkCreateDto: BookmarkCreateDto,
  ): BookmarkCreate {
    return {
      bookId: bookmarkCreateDto.bookId,
      userId: bookmarkCreateDto.userId,
      page: bookmarkCreateDto.page,
    };
  }
}
