import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../../../.env') });
export const sqlConnection = new Pool({
  user: process.env.sqlUserName,
  host: process.env.sqlHost,
  database: process.env.sqlDB,
  password: process.env.sqlPassword,
  port: Number(process.env.sqlPort)
});

sqlConnection.query(
  `
    CREATE SCHEMA IF NOT EXISTS "survey-app"
    AUTHORIZATION postgres;`,
  (err, res) => {
    console.log(err, res);
  }
);

export const queryGenerator = (crudOperation: number, queryObjectModel: object): string => {
  let resultQuery: string;
  if (crudOperation === 1) resultQuery = '';
  return resultQuery;
};
