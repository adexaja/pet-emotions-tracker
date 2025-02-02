import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PetEmotionsSummary1738502449618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet_emotion_summaries',
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
            name: 'summary',
            type: 'text',
            isNullable: false,
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
      'pet_emotion_summaries',
      new TableForeignKey({
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pets',
        name: 'pet_emotion_summaries_pet_id_fkey',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'pet_emotion_summaries',
      'pet_emotion_summaries_pet_id_fkey',
    );
    await queryRunner.dropTable('pet_emotion_summaries');
  }
}
