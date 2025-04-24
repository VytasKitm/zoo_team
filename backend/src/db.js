import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { db_port, db_host, db_name, db_user, db_pass } = process.env;

// prisijungia prie mysql serverio.
const testingConnection = mysql2.createPool({
  host: db_host,
  user: db_user,
  password: db_pass,
  port: Number(db_port),
  waitForConnections: true,
});

// sukuria db jei nera.
await testingConnection.query(`CREATE DATABASE IF NOT EXISTS ${db_name}`);

// sukuria prisijungimus prie db_name db
const pool = mysql2.createPool({
  host: db_host,
  user: db_user,
  database: db_name,
  password: db_pass,
  port: Number(db_port),
  waitForConnections: true,
  multipleStatements: true,
});

export default pool;
