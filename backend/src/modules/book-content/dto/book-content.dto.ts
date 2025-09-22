import { ApiProperty } from '@nestjs/swagger';
import type { Uuid } from 'src/common/type';
import { BookContent } from 'src/modules/book-content/domain/book-content';

export class BookContentDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly id: Uuid;

  @ApiProperty({ example: '1c2d3e4f-5678-90ab-cdef-1234567890ab' })
  readonly bookId: Uuid;

  @ApiProperty({ example: 'https://example.com/book.pdf' })
  readonly url: string;

  @ApiProperty({ example: 'This is the introduction chapter of the book...' })
  readonly content: string | null;

  static fromBookContent(bookContent: BookContent): BookContentDto {
    return {
      id: bookContent.id,
      bookId: bookContent.bookId,
      url: bookContent.url,
      content: bookContent.content,
    };
  }
}
