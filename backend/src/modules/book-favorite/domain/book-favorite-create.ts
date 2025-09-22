import { Uuid } from 'src/common/type';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';

export class BookFavoriteCreate {
  readonly userId: Uuid;

  static toEntity(
    bookFavoriteCreate: BookFavoriteCreate,
  ): Partial<BookFavoriteEntity> {
    return {
      userId: bookFavoriteCreate.userId,
    };
  }
}
