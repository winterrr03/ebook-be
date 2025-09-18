import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/modules/user/dto/user.dto';
import type { Uuid } from 'src/common/type';
import { UserCreateDto } from 'src/modules/user/dto/user-create.dto';
import { UserUpdateDto } from 'src/modules/user/dto/user-update.dto';
import { BookFavoriteItemDto } from 'src/modules/book-favorite/dto/book-favorite-item.dto';
import { BookmarkItemDto } from 'src/modules/bookmark/dto/bookmark-item.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromUsers(await this.userService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: Uuid): Promise<UserDto> {
    return UserDto.fromUser(await this.userService.findOne(id));
  }

  @Get(':id/favorites')
  async findFavorites(@Param('id') id: Uuid): Promise<BookFavoriteItemDto[]> {
    return BookFavoriteItemDto.fromBookFavorites(
      await this.userService.findFavorites(id),
    );
  }

  @Get(':id/bookmarks')
  async findBookmarks(@Param('id') id: Uuid): Promise<BookmarkItemDto[]> {
    return BookmarkItemDto.fromBookmarks(
      await this.userService.findBookmarks(id),
    );
  }

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserDto> {
    return UserDto.fromUser(
      await this.userService.create(UserCreateDto.toUserCreate(userCreateDto)),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: Uuid,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserDto> {
    return UserDto.fromUser(
      await this.userService.update(
        id,
        UserUpdateDto.toUserUpdate(userUpdateDto),
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: Uuid): Promise<void> {
    await this.userService.remove(id);
  }
}
