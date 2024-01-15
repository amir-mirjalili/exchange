import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'exchange',
  entities: [],
  synchronize: true,
  migrations: ['dist/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
