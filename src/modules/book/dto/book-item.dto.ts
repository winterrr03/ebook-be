import { ApiProperty } from '@nestjs/swagger';

export class BookItemDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  id: string;

  @ApiProperty({ example: 'NestJS in Action' })
  title: string;

  @ApiProperty({ example: 'John Doe', required: false })
  readonly author?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z', required: false })
  readonly publishedAt?: Date;
}
