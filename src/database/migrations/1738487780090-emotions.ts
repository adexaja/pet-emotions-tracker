import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Emotions1738487780090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'emotions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'pet_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'emotion',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'intensity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'emotions',
      new TableForeignKey({
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pets',
        name: 'emotions_pet_id_fkey',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('emotions', 'emotions_pet_id_fkey');
    await queryRunner.dropTable('emotions');
  }
}
