import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookFavoriteService {
  constructor(
    @InjectRepository(BookFavoriteEntity)
    private readonly bookFavoriteRepository: Repository<BookFavoriteEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(bookId: Uuid): Promise<void> {
    await this.checkBookExistsOrThrow(bookId);

    await this.bookFavoriteRepository.save(
      this.bookFavoriteRepository.create({ bookId }),
    );
  }

  async removeByBookId(bookId: Uuid): Promise<void> {
    await this.bookFavoriteRepository.remove(
      await this.findOneByBookIdOrThrow(bookId),
    );
  }

  private async findOneByBookIdOrThrow(
    bookId: Uuid,
  ): Promise<BookFavoriteEntity> {
    const bookFavorite = await this.bookFavoriteRepository.findOneBy({
      bookId,
    });

    if (!bookFavorite) {
      throw new NotFoundException(`Favorite for bookId ${bookId} not found`);
    }

    return bookFavorite;
  }

  private async checkBookExistsOrThrow(bookId: Uuid): Promise<void> {
    const isExist = await this.bookRepository.existsBy({ id: bookId });

    if (!isExist) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }
}
