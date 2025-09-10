import { BookEntity } from 'src/modules/book/entity/book.entity';

export class BookCreate {
  readonly title: string;

  readonly url: string;

  readonly author?: string;

  readonly description?: string;

  readonly publishedAt?: Date;

  static toEntity(bookCreate: BookCreate): Partial<BookEntity> {
    return {
      title: bookCreate.title,
      url: bookCreate.url,
      author: bookCreate.author,
      description: bookCreate.description,
      publishedAt: bookCreate.publishedAt,
    };
  }
}
