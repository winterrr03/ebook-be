import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('book_favorites')
export class BookFavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  bookId: Uuid;

  @ManyToOne(() => BookEntity, (book) => book.favorites, {
    onDelete: 'CASCADE',
  })
  book: BookEntity;

  @CreateDateColumn()
  createdAt: Date;
}
