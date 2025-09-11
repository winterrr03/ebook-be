import { ApiProperty } from '@nestjs/swagger';
import type { Uuid } from 'src/common/type';
import { Book } from 'src/modules/book/domain/book';

export class BookDetailDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly id: Uuid;

  @ApiProperty({ example: 'NestJS in Action' })
  readonly title: string;

  @ApiProperty({ example: 'https://example.com/book.pdf' })
  readonly url: string;

  @ApiProperty({ example: 'John Doe' })
  readonly author: string | null;

  @ApiProperty({ example: 'A comprehensive guide to NestJS' })
  readonly description: string | null;

  @ApiProperty({ example: '2025-01-01T00:00:00Z' })
  readonly publishedAt: Date | null;

  @ApiProperty({ example: '2025-08-01T12:00:00Z' })
  readonly createdAt: Date | null;

  @ApiProperty({ example: '2025-08-05T12:00:00Z' })
  readonly updatedAt: Date | null;

  static fromBook(book: Book): BookDetailDto {
    return {
      id: book.id,
      title: book.title,
      url: book.url,
      author: book.author,
      description: book.description,
      publishedAt: book.publishedAt,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }
}
