import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';
import { BookUpdate } from 'src/modules/book/domain/book-update';

export class BookUpdateDto {
  @ApiProperty({ example: 'NestJS in Action', required: false })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  readonly title?: string;

  @ApiProperty({ example: 'https://example.com/book.pdf', required: false })
  @IsOptional()
  @IsUrl({}, { message: 'URL must be a valid URL' })
  readonly url?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString({ message: 'Author must be a string' })
  readonly author?: string;

  @ApiProperty({ example: 'A great book', required: false })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  readonly description?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z', required: false })
  @IsOptional()
  readonly publishedAt?: Date;

  static toBookUpdate = (bookUpdateDto: BookUpdateDto): BookUpdate => ({
    title: bookUpdateDto.title,
    url: bookUpdateDto.url,
    author: bookUpdateDto.author,
    description: bookUpdateDto.description,
    publishedAt: bookUpdateDto.publishedAt,
  });
}
