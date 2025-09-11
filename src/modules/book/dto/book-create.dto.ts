import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';
import { BookCreate } from 'src/modules/book/domain/book-create';

export class BookCreateDto {
  @ApiProperty({ example: 'NestJS in Action' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @ApiProperty({ example: 'https://example.com/book.pdf' })
  @IsUrl({}, { message: 'URL must be a valid URL' })
  readonly url: string;

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

  static toBookCreate(bookCreateDto: BookCreateDto): BookCreate {
    return {
      title: bookCreateDto.title,
      url: bookCreateDto.url,
      author: bookCreateDto.author,
      description: bookCreateDto.description,
      publishedAt: bookCreateDto.publishedAt,
    };
  }
}
