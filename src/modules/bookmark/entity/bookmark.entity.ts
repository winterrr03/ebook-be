import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('bookmarks')
@Unique(['bookId', 'userId', 'page'])
export class BookmarkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  bookId: Uuid;

  @Column()
  userId: Uuid;

  @Column()
  page: number;

  @ManyToOne(() => BookEntity, (book) => book.bookmarks, {
    onDelete: 'CASCADE',
  })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
