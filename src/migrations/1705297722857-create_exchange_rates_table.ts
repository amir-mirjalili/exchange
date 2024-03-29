import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateExchangeRatesTable1705297722857
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exchange_rate',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'from_currency_id', type: 'int' },
          { name: 'to_currency_id', type: 'int' },
          { name: 'rate', type: 'float' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('exchange_rate', [
      new TableForeignKey({
        columnNames: ['from_currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currency',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['to_currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currency',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.query(`
        INSERT INTO exchange_rate (from_currency_id, to_currency_id, rate)
        VALUES
          ((SELECT id FROM currency WHERE symbol = 'USD'), (SELECT id FROM currency WHERE symbol = 'IRR'), 50000),
          ((SELECT id FROM currency WHERE symbol = 'IRR'), (SELECT id FROM currency WHERE symbol = 'USD'), 0.000024),
          ((SELECT id FROM currency WHERE symbol = 'EUR'), (SELECT id FROM currency WHERE symbol = 'USD'), 1.10),
          ((SELECT id FROM currency WHERE symbol = 'USD'), (SELECT id FROM currency WHERE symbol = 'EUR'), 0.91),
          ((SELECT id FROM currency WHERE symbol = 'EUR'), (SELECT id FROM currency WHERE symbol = 'BTC'), 0.000026),
          ((SELECT id FROM currency WHERE symbol = 'BTC'), (SELECT id FROM currency WHERE symbol = 'EUR'), 38956.66),
          ((SELECT id FROM currency WHERE symbol = 'BTC'), (SELECT id FROM currency WHERE symbol = 'ETH'), 16.94),
          ((SELECT id FROM currency WHERE symbol = 'EUR'), (SELECT id FROM currency WHERE symbol = 'ETH'), 0.00044),
          ((SELECT id FROM currency WHERE symbol = 'ETH'), (SELECT id FROM currency WHERE symbol = 'EUR'), 24.77),
          ((SELECT id FROM currency WHERE symbol = 'ETH'), (SELECT id FROM currency WHERE symbol = 'BTC'), 0.059)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exchange_rate');
  }
}
