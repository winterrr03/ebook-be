import type { Uuid } from 'src/common/type';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('book_contents')
export class BookContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  bookId: Uuid;

  @Column()
  url: string;

  @Column({ nullable: true, type: 'text' })
  content: string | null;

  @OneToOne(() => BookEntity, (book) => book.content, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;
}
