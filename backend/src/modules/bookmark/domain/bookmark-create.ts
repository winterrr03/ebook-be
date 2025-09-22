import { Uuid } from 'src/common/type';
import { BookmarkEntity } from 'src/modules/bookmark/entity/bookmark.entity';

export class BookmarkCreate {
  readonly bookId: Uuid;

  readonly userId: Uuid;

  readonly page: number;

  static toEntity(bookmarkCreate: BookmarkCreate): Partial<BookmarkEntity> {
    return {
      bookId: bookmarkCreate.bookId,
      userId: bookmarkCreate.userId,
      page: bookmarkCreate.page,
    };
  }
}
