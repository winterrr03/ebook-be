import { Uuid } from 'src/common/type';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { Book } from 'src/modules/book/domain/book';

export class BookFavorite {
  readonly id: Uuid;

  readonly book: Book;

  readonly createdAt: Date;

  static fromEntity(bookFavoriteEntity: BookFavoriteEntity): BookFavorite {
    return {
      id: bookFavoriteEntity.id,
      book: Book.fromEntity(bookFavoriteEntity.book),
      createdAt: bookFavoriteEntity.createdAt,
    };
  }

  static fromEntities(
    bookFavoriteEntities: BookFavoriteEntity[],
  ): BookFavorite[] {
    return bookFavoriteEntities.map((e) => this.fromEntity(e));
  }
}
