import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCurrencyTable1705231495314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'currency',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'symbol', type: 'varchar', isUnique: true },
          { name: 'name', type: 'varchar' },
          { name: 'type', type: 'enum', enum: ['Fiat', 'Crypto'] },
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

    await queryRunner.query(
      `
      INSERT INTO currency (symbol, name, type)
      VALUES
        ('USD', 'US Dollar','Fiat'),
        ('EUR', 'Euro','Fiat'),
        ('IRR', 'Iranian Rial','Fiat'),
        ('ETH', 'Ethereum','Crypto'),
        ('BTC', 'Bitcoin','Crypto')
        ;
      
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('currency');
  }
}
