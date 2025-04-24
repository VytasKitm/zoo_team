import fs from "fs";
import pool from "../src/db.js";

const fileData = fs.readFileSync("./database/database.sql", "utf8");

const testData = async () => {
  try {

      await pool.query("DROP TABLE IF EXISTS animals");
      console.log("Removing old data from table.");
      await pool.query(fileData);
      console.log("Inserting test data into database");
  } catch (error) {
    console.log(`Failed to insert data. ${error} `);
  }
};

export default testData;
