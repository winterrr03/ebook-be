import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookFavorite } from 'src/modules/book-favorite/domain/book-favorite';
import { BookFavoriteCreate } from 'src/modules/book-favorite/domain/book-favorite-create';
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

  async findAll(): Promise<BookFavorite[]> {
    return BookFavorite.fromEntities(
      await this.bookFavoriteRepository.find({
        relations: {
          book: true,
        },
      }),
    );
  }

  async create(bookFavoriteCreate: BookFavoriteCreate): Promise<BookFavorite> {
    await this.checkBookExistsOrThrow(bookFavoriteCreate.bookId);

    const saved = await this.bookFavoriteRepository.save(
      BookFavoriteCreate.toEntity(bookFavoriteCreate),
    );

    return BookFavorite.fromEntity(
      await this.bookFavoriteRepository.findOneOrFail({
        where: {
          id: saved.id,
        },
        relations: {
          book: true,
        },
      }),
    );
  }

  async remove(id: Uuid): Promise<void> {
    await this.bookFavoriteRepository.remove(await this.findOneOrThrow(id));
  }

  private async findOneOrThrow(id: Uuid): Promise<BookFavoriteEntity> {
    const bookFavorite = await this.bookFavoriteRepository.findOneBy({ id });

    if (!bookFavorite) {
      throw new NotFoundException(`BookFavorite with id ${id} not found`);
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
