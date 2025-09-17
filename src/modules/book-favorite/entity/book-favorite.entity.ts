import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
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
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @CreateDateColumn()
  createdAt: Date;
}
