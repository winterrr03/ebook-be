import { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';

export class Book {
  readonly id: Uuid;

  readonly title: string;

  readonly url: string;

  readonly author: string | null;

  readonly description: string | null;

  readonly publishedAt: Date | null;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(bookEntity: BookEntity): Book {
    return {
      id: bookEntity.id,
      title: bookEntity.title,
      url: bookEntity.url,
      author: bookEntity.author,
      description: bookEntity.description,
      publishedAt: bookEntity.publishedAt,
      createdAt: bookEntity.createdAt,
      updatedAt: bookEntity.updatedAt,
    };
  }

  static fromEntities(bookEntities: BookEntity[]): Book[] {
    return bookEntities.map((e) => this.fromEntity(e));
  }
}
