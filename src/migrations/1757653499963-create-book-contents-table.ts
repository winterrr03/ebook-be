import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookContentsTable1757653499963
  implements MigrationInterface
{
  name = 'CreateBookContentsTable1757653499963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book_contents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid NOT NULL, "url" character varying NOT NULL, "content" text, CONSTRAINT "REL_a1c217e8085913612f245f1f48" UNIQUE ("bookId"), CONSTRAINT "PK_34d62ee7a384a4238a0f2df00be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_contents" ADD CONSTRAINT "FK_a1c217e8085913612f245f1f487" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_contents" DROP CONSTRAINT "FK_a1c217e8085913612f245f1f487"`,
    );
    await queryRunner.query(`DROP TABLE "book_contents"`);
  }
}
