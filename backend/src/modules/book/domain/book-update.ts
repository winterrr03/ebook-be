import { BookEntity } from 'src/modules/book/entity/book.entity';

export class BookUpdate {
  readonly title?: string;

  readonly url?: string;

  readonly author?: string;

  readonly description?: string;

  readonly publishedAt?: Date;

  static toEntity(bookUpdate: BookUpdate): Partial<BookEntity> {
    return {
      title: bookUpdate.title,
      url: bookUpdate.url,
      author: bookUpdate.author,
      description: bookUpdate.description,
      publishedAt: bookUpdate.publishedAt,
    };
  }
}
