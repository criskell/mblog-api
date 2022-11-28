import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikesTable1669592154115 implements MigrationInterface {
    name = 'CreateLikesTable1669592154115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_likes" ("likerId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_0f0c3a8d1655a59e190352bb5ff" PRIMARY KEY ("likerId", "postId"))`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_507ce5b9182546e25e3afc0944b" FOREIGN KEY ("likerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "FK_6999d13aca25e33515210abaf16" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_6999d13aca25e33515210abaf16"`);
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "FK_507ce5b9182546e25e3afc0944b"`);
        await queryRunner.query(`DROP TABLE "post_likes"`);
    }

}
