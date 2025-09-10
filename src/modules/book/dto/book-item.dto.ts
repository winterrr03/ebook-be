import { ApiProperty } from '@nestjs/swagger';
import type { Uuid } from 'src/common/type';
import { Book } from 'src/modules/book/domain/book';

export class BookItemDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly id: Uuid;

  @ApiProperty({ example: 'NestJS in Action' })
  readonly title: string;

  @ApiProperty({ example: 'John Doe', required: false })
  readonly author?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z', required: false })
  readonly publishedAt?: Date;

  static fromBook = (book: Book): BookItemDto => ({
    id: book.id,
    title: book.title,
    author: book.author ?? undefined,
    publishedAt: book.publishedAt ?? undefined,
  });

  static fromBooks = (books: Book[]): BookItemDto[] =>
    books.map(BookItemDto.fromBook);
}
