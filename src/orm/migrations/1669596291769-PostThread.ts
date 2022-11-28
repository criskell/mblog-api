import { MigrationInterface, QueryRunner } from "typeorm";

export class PostThread1669596291769 implements MigrationInterface {
  name = "PostThread1669596291769";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ADD "parentId" integer`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_070218af41a90b3a4522d8a70b4" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_070218af41a90b3a4522d8a70b4"`
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "parentId"`);
  }
}
