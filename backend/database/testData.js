import fs from "fs";
import pool from "../src/db.js";

const fileData = fs.readFileSync("./database/database.sql", "utf8");


const testData = async () => {
  try {

      await pool.query("DROP TABLE IF EXISTS animals");
      console.log('Trinama "animals" lentele');
      await pool.query(fileData);
      console.log("Irasomi nauji animals duomenys.");
      process.exit(0)
    } catch (error) {
      console.log(`Failed to insert data. ${error} `);
      process.exit(1)
  } finally {
    await pool.end()
    console.log("Duomenu rasymas baigtas")
  }
};

testData()
