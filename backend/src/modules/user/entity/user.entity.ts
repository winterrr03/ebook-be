import type { Uuid } from 'src/common/type';
import { RoleType } from 'src/guards/role-type';
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

  @Column({ unique: true, nullable: true, type: 'uuid' })
  keyCloakId: Uuid | null;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

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
