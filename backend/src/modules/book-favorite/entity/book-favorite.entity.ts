import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity('book_favorites')
@Unique(['bookId', 'userId'])
export class BookFavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  bookId: Uuid;

  @Column()
  userId: Uuid;

  @ManyToOne(() => BookEntity, (book) => book.favorites, {
    onDelete: 'CASCADE',
  })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorites, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
