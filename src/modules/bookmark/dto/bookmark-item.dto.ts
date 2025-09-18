import { ApiProperty } from '@nestjs/swagger';
import type { Uuid } from 'src/common/type';
import { Bookmark } from 'src/modules/bookmark/domain/bookmark';

export class BookmarkItemDto {
  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly id: Uuid;

  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly bookId: Uuid;

  @ApiProperty({ example: '6ff3526c-90dc-4545-9bf4-c1822e2bd19f' })
  readonly userId: Uuid;

  @ApiProperty({ example: 10 })
  readonly page: number;

  static fromBookmark(bookmark: Bookmark): BookmarkItemDto {
    return {
      id: bookmark.id,
      bookId: bookmark.bookId,
      userId: bookmark.userId,
      page: bookmark.page,
    };
  }

  static fromBookmarks(bookmarks: Bookmark[]): BookmarkItemDto[] {
    return bookmarks.map((e) => this.fromBookmark(e));
  }
}
