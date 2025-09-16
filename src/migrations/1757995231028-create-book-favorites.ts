import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookFavorites1757995231028 implements MigrationInterface {
  name = 'CreateBookFavorites1757995231028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book_favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_f94914cf1be35ae33bcf4b52f0" UNIQUE ("bookId"), CONSTRAINT "PK_9c2a671cc23b5674e2fcff55d0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_favorites" ADD CONSTRAINT "FK_f94914cf1be35ae33bcf4b52f02" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_favorites" DROP CONSTRAINT "FK_f94914cf1be35ae33bcf4b52f02"`,
    );
    await queryRunner.query(`DROP TABLE "book_favorites"`);
  }
}
