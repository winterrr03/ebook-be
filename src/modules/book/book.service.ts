import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/modules/book/domain/book.domain';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { BookMapper } from 'src/modules/book/mapper/book.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<Book[]> {
    return BookMapper.toDomainsFromEntities(await this.bookRepository.find());
  }

  async findOne(id: string): Promise<Book> {
    return BookMapper.toDomainFromEntity(await this.findOneOrThrow(id));
  }

  async create(domain: Book): Promise<Book> {
    return BookMapper.toDomainFromEntity(
      await this.bookRepository.save(BookMapper.toEntityFromDomain(domain)),
    );
  }

  async update(id: string, domain: Book): Promise<Book> {
    await this.bookRepository.update(
      { id },
      BookMapper.toEntityFromDomain(domain),
    );

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOneOrThrow(id);

    await this.bookRepository.delete(id);
  }

  private async findOneOrThrow(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }
}
