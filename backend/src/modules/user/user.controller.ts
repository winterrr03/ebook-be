import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/modules/user/dto/user.dto';
import type { Uuid } from 'src/common/type';
import { UserUpdateDto } from 'src/modules/user/dto/user-update.dto';
import { BookFavoriteItemDto } from 'src/modules/book-favorite/dto/book-favorite-item.dto';
import { BookmarkItemDto } from 'src/modules/bookmark/dto/bookmark-item.dto';
import { RequireLoggedIn } from 'src/guards/role-container';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromUsers(await this.userService.findAll());
  }

  @Get('me')
  @RequireLoggedIn()
  getMe(@AuthUser() user: UserEntity): UserDto {
    return UserDto.fromUser(user);
  }

  @Get('favorites')
  @RequireLoggedIn()
  async findFavorites(
    @AuthUser() user: UserEntity,
  ): Promise<BookFavoriteItemDto[]> {
    return BookFavoriteItemDto.fromBookFavorites(
      await this.userService.findFavorites(user),
    );
  }

  @Get('bookmarks')
  @RequireLoggedIn()
  async findBookmarks(
    @AuthUser() user: UserEntity,
  ): Promise<BookmarkItemDto[]> {
    return BookmarkItemDto.fromBookmarks(
      await this.userService.findBookmarks(user),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: Uuid): Promise<UserDto> {
    return UserDto.fromUser(await this.userService.findOne(id));
  }

  @Patch('me')
  @RequireLoggedIn()
  async update(
    @AuthUser() user: UserEntity,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserDto> {
    return UserDto.fromUser(
      await this.userService.update(
        user,
        UserUpdateDto.toUserUpdate(userUpdateDto),
      ),
    );
  }

  @Delete('me')
  @RequireLoggedIn()
  async remove(@AuthUser() user: UserEntity): Promise<void> {
    await this.userService.remove(user);
  }
}
