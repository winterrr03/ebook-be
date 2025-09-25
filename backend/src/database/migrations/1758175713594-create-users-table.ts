import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1758175713594 implements MigrationInterface {
  name = 'CreateUsersTable1758175713594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "UQ_3c4d8c43ad37d7cada5b504c26d"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_favorites" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_favorites" ADD CONSTRAINT "UQ_61b4308ef2b3b3b85600620ac5b" UNIQUE ("bookId", "userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "UQ_bd4e812dcf579205dd19e0623fe" UNIQUE ("bookId", "userId", "page")`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_favorites" ADD CONSTRAINT "FK_0be50005f5877e13c510b532764" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_c6065536f2f6de3a0163e19a584" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_c6065536f2f6de3a0163e19a584"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_favorites" DROP CONSTRAINT "FK_0be50005f5877e13c510b532764"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "UQ_bd4e812dcf579205dd19e0623fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_favorites" DROP CONSTRAINT "UQ_61b4308ef2b3b3b85600620ac5b"`,
    );
    await queryRunner.query(`ALTER TABLE "bookmarks" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "book_favorites" DROP COLUMN "userId"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "UQ_3c4d8c43ad37d7cada5b504c26d" UNIQUE ("bookId", "page")`,
    );
  }
}
