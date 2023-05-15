import pg from 'pg';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv'

dotenv.config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

const sqlInsert = (await readFile('./scripts/cartsData.sql')).toString();
pool.connect();

pool.on('connect', async (client) => {
  const queries = sqlInsert.split(';');
  queries.forEach(async (query) => {
    await client.query(query, (err, res) => {
      console.log(res);
      if (err) {
        console.log('error', err);
      };
    });
  });
});
