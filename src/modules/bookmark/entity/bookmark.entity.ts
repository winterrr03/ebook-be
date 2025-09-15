import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  JoinColumn,
} from 'typeorm';

@Entity('bookmarks')
@Unique(['bookId', 'page'])
export class BookmarkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  bookId: Uuid;

  @Column()
  page: number;

  @ManyToOne(() => BookEntity, (book) => book.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
