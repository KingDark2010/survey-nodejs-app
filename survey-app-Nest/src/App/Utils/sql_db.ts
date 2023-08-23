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
  CREATE SCHEMA IF NOT EXISTS Survey_App
  AUTHORIZATION postgres;

  CREATE TABLE IF NOT EXISTS Survey_App.Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    login_tokens JSON CHECK (json_array_length(login_tokens) <= 3)
  );
  
  CREATE TABLE IF NOT EXISTS Survey_App.Surveys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES Survey_App.Users(id),
    questions JSON
  );
  
  CREATE TABLE IF NOT EXISTS Survey_App.Survey_Results (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES Survey_App.Surveys(id),
    is_registered_user BOOLEAN,
    question_answer_pairs JSON
  );
  INSERT INTO Survey_App.Users (name, username, password, email)
  SELECT '${process.env.ADMIN_NAME}', '${process.env.ADMIN_USERNAME}', '${process.env.ADMIN_PASSWORD}', '${process.env.ADMIN_EMAIL}'
  WHERE NOT EXISTS (
      SELECT 1 FROM Survey_App.Users WHERE username = '${process.env.ADMIN_USERNAME}'
  );`,
  (err) => {
    console.log(err);
  }
);

// export const queryGenerator = (crudOperation: number, queryObjectModel: object): string => {
//   let resultQuery: string;
//   if (crudOperation === 1) resultQuery = '';
//   return resultQuery;
// };
