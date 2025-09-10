import { Book } from 'src/modules/book/domain/book.domain';
import { CreateBookDto } from 'src/modules/book/dto/book-create.dto';
import { BookDetailDto } from 'src/modules/book/dto/book-detail.dto';
import { BookItemDto } from 'src/modules/book/dto/book-item.dto';
import { UpdateBookDto } from 'src/modules/book/dto/book-update.dto';
import { BookEntity } from 'src/modules/book/entity/book.entity';

export class BookMapper {
  static toDomainFromCreateDto = (dto: CreateBookDto): Book => ({
    title: dto.title,
    url: dto.url,
    author: dto.author,
    description: dto.description,
    publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
  });

  static toDomainFromUpdateDto = (
    dto: UpdateBookDto,
    existing: Book,
  ): Book => ({
    id: existing.id,
    title: dto.title ?? existing.title,
    url: dto.url ?? existing.url,
    author: dto.author ?? existing.author,
    description: dto.description ?? existing.description,
    publishedAt: dto.publishedAt
      ? new Date(dto.publishedAt)
      : existing.publishedAt,
  });

  static toItemDtoFromDomain = (domain: Book): BookItemDto => ({
    id: domain.id!,
    title: domain.title,
    author: domain.author,
    publishedAt: domain.publishedAt,
  });

  static toDetailDtoFromDomain = (domain: Book): BookDetailDto => ({
    id: domain.id!,
    title: domain.title,
    url: domain.url,
    author: domain.author,
    description: domain.description,
    publishedAt: domain.publishedAt,
    createdAt: domain.createdAt,
    updatedAt: domain.updatedAt,
  });

  static toEntityFromDomain = (domain: Book): Partial<BookEntity> => ({
    title: domain.title,
    url: domain.url,
    author: domain.author,
    description: domain.description,
    publishedAt: domain.publishedAt,
  });

  static toDomainFromEntity = (entity: BookEntity): Book => ({
    id: entity.id,
    title: entity.title,
    url: entity.url,
    author: entity.author,
    description: entity.description,
    publishedAt: entity.publishedAt,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  });

  static toDomainsFromEntities = (entities: BookEntity[]): Book[] =>
    entities.map(BookMapper.toDomainFromEntity);

  static toItemDtosFromDomains = (domains: Book[]): BookItemDto[] =>
    domains.map(BookMapper.toItemDtoFromDomain);
}
