import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookFavorite } from 'src/modules/book-favorite/domain/book-favorite';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { Bookmark } from 'src/modules/bookmark/domain/bookmark';
import { BookmarkEntity } from 'src/modules/bookmark/entity/bookmark.entity';
import { User } from 'src/modules/user/domain/user';
import { UserCreate } from 'src/modules/user/domain/user-create';
import { UserUpdate } from 'src/modules/user/domain/user-update';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookFavoriteEntity)
    private readonly favoriteRepository: Repository<BookFavoriteEntity>,
    @InjectRepository(BookmarkEntity)
    private readonly bookmarkRepository: Repository<BookmarkEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    return User.fromEntities(await this.userRepository.find());
  }

  async findOne(id: Uuid): Promise<User> {
    return User.fromEntity(await this.findOneOrThrow(id));
  }

  async create(userCreate: UserCreate): Promise<User> {
    await this.verifyEmailIsNotExisting(userCreate.email);

    return User.fromEntity(
      await this.userRepository.save(
        this.userRepository.create(UserCreate.toEntity(userCreate)),
      ),
    );
  }

  async update(id: Uuid, userUpdate: UserUpdate): Promise<User> {
    return User.fromEntity(
      await this.userRepository.save({
        ...(await this.findOneOrThrow(id)),
        ...UserUpdate.toEntity(userUpdate),
      }),
    );
  }

  async remove(id: Uuid): Promise<void> {
    await this.userRepository.remove(await this.findOneOrThrow(id));
  }

  async findFavorites(id: Uuid): Promise<BookFavorite[]> {
    await this.findOneOrThrow(id);

    return BookFavorite.fromEntities(
      await this.favoriteRepository.find({
        where: { userId: id },
        relations: {
          book: true,
        },
      }),
    );
  }

  async findBookmarks(id: Uuid): Promise<Bookmark[]> {
    await this.findOneOrThrow(id);

    return Bookmark.fromEntities(
      await this.bookmarkRepository.findBy({ userId: id }),
    );
  }

  private async verifyEmailIsNotExisting(email: string): Promise<void> {
    const exists = await this.userRepository.existsBy({ email });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }
  }

  private async findOneOrThrow(id: Uuid): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
