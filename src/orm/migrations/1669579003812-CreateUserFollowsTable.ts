import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserFollowsTable1669579003812 implements MigrationInterface {
  name = "CreateUserFollowsTable1669579003812";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_followers_users" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_ee8a9c5a097f32b484caaeb3de7" PRIMARY KEY ("usersId_1", "usersId_2"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8d63f6043394b4d32343bdea11" ON "users_followers_users" ("usersId_1") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1433e3275a501bc09f5c33c7ca" ON "users_followers_users" ("usersId_2") `
    );
    await queryRunner.query(
      `ALTER TABLE "users_followers_users" ADD CONSTRAINT "FK_8d63f6043394b4d32343bdea11d" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_followers_users" ADD CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_followers_users" DROP CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_followers_users" DROP CONSTRAINT "FK_8d63f6043394b4d32343bdea11d"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1433e3275a501bc09f5c33c7ca"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8d63f6043394b4d32343bdea11"`
    );
    await queryRunner.query(`DROP TABLE "users_followers_users"`);
  }
}
