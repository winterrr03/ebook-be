import type { Uuid } from 'src/common/type';
import { BookContentEntity } from 'src/modules/book-content/entity/book-content.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  title: string;

  @Column()
  url: string;

  @OneToOne(() => BookContentEntity, (content) => content.book, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  content: BookContentEntity | null;

  @Column({ nullable: true, type: 'varchar' })
  author: string | null;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  publishedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
