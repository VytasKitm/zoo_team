import pool from "../db.js";

export async function createAnimal({ vardas, rusis, svoris, aplinka, lt }) {
  const query = `
    INSERT INTO animals (vardas, rusis, svoris, aplinka, lt)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [vardas, rusis, svoris, aplinka, lt];

  try {
    const [result] = await pool.query(query, values);
    return result.insertId; 
  } catch (error) {
    console.error("Error inserting animal:", error);
    throw new Error("Failed to insert animal into the database.");
  }
}
