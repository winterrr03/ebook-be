import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookFavoriteCreate } from 'src/modules/book-favorite/domain/book-favorite-create';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookFavoriteService {
  constructor(
    @InjectRepository(BookFavoriteEntity)
    private readonly bookFavoriteRepository: Repository<BookFavoriteEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    bookId: Uuid,
    bookFavoriteCreate: BookFavoriteCreate,
  ): Promise<void> {
    await Promise.all([
      this.checkBookExistsOrThrow(bookId),
      this.checkUserExistsOrThrow(bookFavoriteCreate.userId),
    ]);

    await this.bookFavoriteRepository.save(
      this.bookFavoriteRepository.create({
        bookId,
        ...BookFavoriteCreate.toEntity(bookFavoriteCreate),
      }),
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

  private async checkUserExistsOrThrow(userId: Uuid): Promise<void> {
    const isExist = await this.userRepository.existsBy({ id: userId });

    if (!isExist) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  private async checkBookExistsOrThrow(bookId: Uuid): Promise<void> {
    const isExist = await this.bookRepository.existsBy({ id: bookId });

    if (!isExist) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }
}
