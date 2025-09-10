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

  @ApiProperty({ example: 'John Doe', required: false })
  readonly author?: string;

  @ApiProperty({ example: 'A comprehensive guide to NestJS', required: false })
  readonly description?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z', required: false })
  readonly publishedAt?: Date;

  @ApiProperty({ example: '2025-08-01T12:00:00Z', required: false })
  readonly createdAt?: Date;

  @ApiProperty({ example: '2025-08-05T12:00:00Z', required: false })
  readonly updatedAt?: Date;

  static fromBook = (book: Book): BookDetailDto => ({
    id: book.id,
    title: book.title,
    url: book.url,
    author: book.author ?? undefined,
    description: book.description ?? undefined,
    publishedAt: book.publishedAt ?? undefined,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
  });
}
