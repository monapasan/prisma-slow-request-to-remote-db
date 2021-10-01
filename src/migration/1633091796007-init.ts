import {MigrationInterface, QueryRunner} from "typeorm";

export class init1633091796007 implements MigrationInterface {
    name = 'init1633091796007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Statement" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "contextId" integer, CONSTRAINT "PK_3dd87ecaf0b1ea7f30b0e8e34a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Context" ("id" SERIAL NOT NULL, "contextName" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3bed32bef9825045176f42ce722" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Statement" ADD CONSTRAINT "FK_3cee69a5fc1014a892a85d49073" FOREIGN KEY ("contextId") REFERENCES "Context"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Statement" DROP CONSTRAINT "FK_3cee69a5fc1014a892a85d49073"`);
        await queryRunner.query(`DROP TABLE "Context"`);
        await queryRunner.query(`DROP TABLE "Statement"`);
    }

}
