import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { Currency } from './currencies/entities/currency.entity';
import { ExchangeRate } from './exchange_rates/entities/exchange_rates.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'exchange',
  entities: [Currency, ExchangeRate],
  synchronize: true,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
