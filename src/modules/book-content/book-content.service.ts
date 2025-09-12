import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookContent } from 'src/modules/book-content/domain/book-content';
import { BookContentEntity } from 'src/modules/book-content/entity/book-content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookContentService {
  constructor(
    @InjectRepository(BookContentEntity)
    private readonly bookContentRepository: Repository<BookContentEntity>,
  ) {}

  async findAll(): Promise<BookContent[]> {
    return BookContent.fromEntities(await this.bookContentRepository.find());
  }

  async findByBookId(bookId: Uuid): Promise<BookContent> {
    return BookContent.fromEntity(await this.findOneOrThrow(bookId));
  }

  async createEmpty(bookId: Uuid, url: string): Promise<BookContent> {
    return BookContent.fromEntity(
      await this.bookContentRepository.save(
        this.bookContentRepository.create({ bookId, url, content: null }),
      ),
    );
  }

  async updateContent(bookId: Uuid, content: string): Promise<BookContent> {
    return BookContent.fromEntity(
      await this.bookContentRepository.save({
        ...(await this.findByBookId(bookId)),
        content,
      }),
    );
  }

  private async findOneOrThrow(bookId: Uuid): Promise<BookContentEntity> {
    const entity = await this.bookContentRepository.findOneBy({
      bookId,
    });

    if (!entity) {
      throw new NotFoundException(`Content for book ${bookId} not found`);
    }

    return entity;
  }
}
