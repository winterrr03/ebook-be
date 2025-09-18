import { Uuid } from 'src/common/type';
import { BookmarkEntity } from '../entity/bookmark.entity';

export class Bookmark {
  readonly id: Uuid;

  readonly bookId: Uuid;

  readonly userId: Uuid;

  readonly page: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(bookmarkEntity: BookmarkEntity): Bookmark {
    return {
      id: bookmarkEntity.id,
      bookId: bookmarkEntity.bookId,
      userId: bookmarkEntity.userId,
      page: bookmarkEntity.page,
      createdAt: bookmarkEntity.createdAt,
      updatedAt: bookmarkEntity.updatedAt,
    };
  }

  static fromEntities(bookmarkEntities: BookmarkEntity[]): Bookmark[] {
    return bookmarkEntities.map((e) => this.fromEntity(e));
  }
}
