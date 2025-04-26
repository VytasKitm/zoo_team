import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;


// prisijungia prie mysql serverio.
const testingConnection = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: Number(DB_PORT),
  waitForConnections: true,
});

// sukuria db jei nera.
await testingConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

// sukuria prisijungimus prie db_name db
const pool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: Number(DB_PORT),
  waitForConnections: true,
  multipleStatements: true,
});

// funkcija sql debuginimui jei kam prireiks

// const origQuery = pool.query.bind(pool);
// pool.query = async function (sql, params) {
//   console.log('🛠 SQL →', sql.trim());
//   if (Array.isArray(params) && params.length) {
//     console.log('🛠 Params →', params);
//   }
//   return origQuery(sql, params);
// };

export default pool;
