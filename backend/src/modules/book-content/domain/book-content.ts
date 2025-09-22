import type { Uuid } from 'src/common/type';
import { BookContentEntity } from 'src/modules/book-content/entity/book-content.entity';

export class BookContent {
  readonly id: Uuid;

  readonly bookId: Uuid;

  readonly url: string;

  readonly content: string | null;

  static fromEntity(bookContentEntity: BookContentEntity): BookContent {
    return {
      id: bookContentEntity.id,
      bookId: bookContentEntity.bookId,
      url: bookContentEntity.url,
      content: bookContentEntity.content,
    };
  }

  static fromEntities(bookContentEntities: BookContentEntity[]): BookContent[] {
    return bookContentEntities.map((e) => this.fromEntity(e));
  }
}
