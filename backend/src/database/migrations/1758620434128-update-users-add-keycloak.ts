import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersAddKeycloak1758620434128 implements MigrationInterface {
  name = 'UpdateUsersAddKeycloak1758620434128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "keyCloakId" uuid`);

    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('GUEST', 'USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER'`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_11a2c981d0ce4810ccc5b32b949" UNIQUE ("keyCloakId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_11a2c981d0ce4810ccc5b32b949"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "keyCloakId"`);
  }
}
