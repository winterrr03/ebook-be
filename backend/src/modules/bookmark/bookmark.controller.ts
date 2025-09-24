import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkCreateDto } from 'src/modules/bookmark/dto/bookmark-create.dto';
import { BookmarkItemDto } from 'src/modules/bookmark/dto/bookmark-item.dto';
import type { Uuid } from 'src/common/type';
import { ApiTags } from '@nestjs/swagger';
import { RequireLoggedIn } from 'src/guards/role-container';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@ApiTags('Bookmarks')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async findAll(): Promise<BookmarkItemDto[]> {
    return BookmarkItemDto.fromBookmarks(await this.bookmarkService.findAll());
  }

  @Post()
  @RequireLoggedIn()
  async create(
    @AuthUser() user: UserEntity,
    @Body() bookmarkCreateDto: BookmarkCreateDto,
  ): Promise<BookmarkItemDto> {
    return BookmarkItemDto.fromBookmark(
      await this.bookmarkService.create(
        BookmarkCreateDto.toBookmarkCreate(bookmarkCreateDto),
        user,
      ),
    );
  }

  @Delete(':id')
  @RequireLoggedIn()
  async remove(
    @AuthUser() user: UserEntity,
    @Param('id') id: Uuid,
  ): Promise<void> {
    await this.bookmarkService.remove(id, user);
  }
}
