import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bootstrap1651683752239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Table schemas for v0.1.0
    // Create all tables
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "roles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "edit_settings" boolean NOT NULL, "edit_controllers" boolean NOT NULL, "edit_users" boolean NOT NULL, "view_settings" boolean NOT NULL, "view_camera" boolean NOT NULL, "view_stats" boolean NOT NULL, "view_logs" boolean NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"));`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "role_id" integer, CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "measurement_conversions" ("id" varchar PRIMARY KEY NOT NULL, "convert_unit_from" text NOT NULL, "convert_unit_to" text NOT NULL, "equation" text NOT NULL);`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "nodes" ("id" varchar PRIMARY KEY NOT NULL, "public_key" text NOT NULL, "type" text NOT NULL, "name" text NOT NULL, "nickname" text NOT NULL, "icon" text NOT NULL, "is_enabled" boolean NOT NULL DEFAULT (1), "settings_raw" text NOT NULL DEFAULT (''));`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "node_channels" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "is_enabled" boolean NOT NULL DEFAULT (1), "measurement_key" text NOT NULL, "default_measurement_unit" text NOT NULL, "channel" integer NOT NULL, "icon" text, "settings_raw" text NOT NULL DEFAULT (''), "node_id" varchar NOT NULL, "conversion_id" varchar, CONSTRAINT "FK_dfc2f20e73157717efea94ecbe2" FOREIGN KEY ("node_id") REFERENCES "nodes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8efb16d26ef672c7b8b2f03ab43" FOREIGN KEY ("conversion_id") REFERENCES "measurement_conversions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "dashboard_cards" ("id" varchar PRIMARY KEY NOT NULL, "order" integer NOT NULL, "controller_id" varchar NOT NULL, "controller_type" text NOT NULL);`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "migrations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" bigint NOT NULL, "name" varchar NOT NULL);`,
    );
  }

  public async down(): Promise<void> {
    // do nothing
  }
}
