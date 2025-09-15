import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookmarksTable1757946757536 implements MigrationInterface {
  name = 'CreateBookmarksTable1757946757536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid NOT NULL, "page" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c4d8c43ad37d7cada5b504c26d" UNIQUE ("bookId", "page"), CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_2c733d2b9f99ec2b765e3799f3d" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_2c733d2b9f99ec2b765e3799f3d"`,
    );
    await queryRunner.query(`DROP TABLE "bookmarks"`);
  }
}
