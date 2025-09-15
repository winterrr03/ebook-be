import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkCreateDto } from 'src/modules/bookmark/dto/bookmark-create.dto';
import { BookmarkItemDto } from 'src/modules/bookmark/dto/bookmark-item.dto';
import type { Uuid } from 'src/common/type';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  async create(
    @Body() bookmarkCreateDto: BookmarkCreateDto,
  ): Promise<BookmarkItemDto> {
    return BookmarkItemDto.fromBookmark(
      await this.bookmarkService.create(
        BookmarkCreateDto.toBookmarkCreate(bookmarkCreateDto),
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: Uuid): Promise<void> {
    await this.bookmarkService.remove(id);
  }
}
