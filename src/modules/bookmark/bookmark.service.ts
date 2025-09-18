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
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Bookmark[]> {
    return Bookmark.fromEntities(await this.bookmarkRepository.find());
  }

  async create(bookmarkCreate: BookmarkCreate): Promise<Bookmark> {
    await Promise.all([
      this.checkBookExistsOrThrow(bookmarkCreate.bookId),
      this.checkUserExistsOrThrow(bookmarkCreate.userId),
    ]);

    return Bookmark.fromEntity(
      await this.bookmarkRepository.save(
        BookmarkCreate.toEntity(bookmarkCreate),
      ),
    );
  }

  async remove(id: Uuid): Promise<void> {
    await this.bookmarkRepository.remove(await this.findOneOrThrow(id));
  }

  private async findOneOrThrow(id: Uuid): Promise<BookmarkEntity> {
    const bookmark = await this.bookmarkRepository.findOneBy({ id });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with id ${id} not found`);
    }

    return bookmark;
  }

  private async checkUserExistsOrThrow(userId: Uuid): Promise<void> {
    const isExist = await this.userRepository.existsBy({ id: userId });

    if (!isExist) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  private async checkBookExistsOrThrow(bookId: Uuid): Promise<void> {
    const isExist = await this.bookRepository.existsBy({ id: bookId });

    if (!isExist) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }
}
