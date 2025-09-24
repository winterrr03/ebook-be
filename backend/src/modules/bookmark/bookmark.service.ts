import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { Bookmark } from 'src/modules/bookmark/domain/bookmark';
import { BookmarkCreate } from 'src/modules/bookmark/domain/bookmark-create';
import { BookmarkEntity } from 'src/modules/bookmark/entity/bookmark.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(BookmarkEntity)
    private readonly bookmarkRepository: Repository<BookmarkEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<Bookmark[]> {
    return Bookmark.fromEntities(await this.bookmarkRepository.find());
  }

  async create(
    bookmarkCreate: BookmarkCreate,
    user: UserEntity,
  ): Promise<Bookmark> {
    await this.checkBookExistsOrThrow(bookmarkCreate.bookId);

    return Bookmark.fromEntity(
      await this.bookmarkRepository.save(
        this.bookmarkRepository.create({
          ...BookmarkCreate.toEntity(bookmarkCreate),
          userId: user.id,
        }),
      ),
    );
  }

  async remove(id: Uuid, user: UserEntity): Promise<void> {
    await this.bookmarkRepository.remove(await this.findOneOrThrow(id, user));
  }

  private async findOneOrThrow(
    id: Uuid,
    user: UserEntity,
  ): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOneBy({
      id,
      userId: user.id,
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with id ${id} not found`);
    }

    return bookmark;
  }

  private async checkBookExistsOrThrow(bookId: Uuid): Promise<void> {
    const isExist = await this.bookRepository.existsBy({ id: bookId });

    if (!isExist) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }
}
