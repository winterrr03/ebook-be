import { Controller, Delete, Param, Post } from '@nestjs/common';
import { BookFavoriteService } from './book-favorite.service';
import type { Uuid } from 'src/common/type';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { RequireLoggedIn } from 'src/guards/role-container';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@ApiTags('BookFavorites')
@Controller('book-favorites')
export class BookFavoriteController {
  constructor(private readonly bookFavoriteService: BookFavoriteService) {}

  @Post(':bookId')
  @RequireLoggedIn()
  async create(
    @AuthUser() user: UserEntity,
    @Param('bookId') bookId: Uuid,
  ): Promise<void> {
    await this.bookFavoriteService.create(bookId, user);
  }

  @Delete(':bookId')
  @RequireLoggedIn()
  async remove(
    @AuthUser() user: UserEntity,
    @Param('bookId') bookId: Uuid,
  ): Promise<void> {
    await this.bookFavoriteService.removeByBookId(bookId, user);
  }
}
