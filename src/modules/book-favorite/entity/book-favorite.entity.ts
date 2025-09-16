import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('book_favorites')
export class BookFavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  bookId: Uuid;

  @OneToOne(() => BookEntity, (book) => book.favorite, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @CreateDateColumn()
  createdAt: Date;
}
