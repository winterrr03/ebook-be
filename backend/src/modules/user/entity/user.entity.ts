import type { Uuid } from 'src/common/type';
import { BookFavoriteEntity } from 'src/modules/book-favorite/entity/book-favorite.entity';
import { BookmarkEntity } from 'src/modules/bookmark/entity/bookmark.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  firstName: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastName: string | null;

  @OneToMany(() => BookFavoriteEntity, (favorite) => favorite.user, {
    cascade: true,
  })
  favorites: BookFavoriteEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.user, {
    cascade: true,
  })
  bookmarks: BookmarkEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
