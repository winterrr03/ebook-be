import { ApiProperty } from '@nestjs/swagger';

export class BookDetailDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  id: string;

  @ApiProperty({ example: 'NestJS in Action' })
  title: string;

  @ApiProperty({ example: 'https://example.com/book.pdf' })
  url: string;

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
}
