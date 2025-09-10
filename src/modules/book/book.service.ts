import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookCreate } from 'src/modules/book/domain/book-create';
import { BookUpdate } from 'src/modules/book/domain/book-update';
import { Book } from 'src/modules/book/domain/book';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<Book[]> {
    return Book.fromEntities(await this.bookRepository.find());
  }

  async findOne(id: Uuid): Promise<Book> {
    return Book.fromEntity(await this.findOneOrThrow(id));
  }

  async create(bookCreate: BookCreate): Promise<Book> {
    return Book.fromEntity(
      await this.bookRepository.save(BookCreate.toEntity(bookCreate)),
    );
  }

  async update(id: Uuid, bookUpdate: BookUpdate): Promise<Book> {
    return Book.fromEntity(
      await this.bookRepository.save({
        ...(await this.findOneOrThrow(id)),
        ...BookUpdate.toEntity(bookUpdate),
      }),
    );
  }

  async remove(id: Uuid): Promise<void> {
    await this.bookRepository.remove(await this.findOneOrThrow(id));
  }

  private async findOneOrThrow(id: Uuid): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({
      id,
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }
}
