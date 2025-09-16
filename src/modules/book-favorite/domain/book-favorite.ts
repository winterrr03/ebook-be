import { Uuid } from 'src/common/type';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';

export class BookFavorite {
  readonly id: Uuid;

  readonly bookId: Uuid;

  readonly createdAt: Date;

  static fromEntity(bookFavoriteEntity: BookFavoriteEntity): BookFavorite {
    return {
      id: bookFavoriteEntity.id,
      bookId: bookFavoriteEntity.bookId,
      createdAt: bookFavoriteEntity.createdAt,
    };
  }

  static fromEntities(
    bookFavoriteEntities: BookFavoriteEntity[],
  ): BookFavorite[] {
    return bookFavoriteEntities.map((e) => this.fromEntity(e));
  }
}
