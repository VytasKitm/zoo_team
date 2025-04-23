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

// Function to get an animal by its ID
export async function getAnimalById(id) {
  const query = `
    SELECT * FROM animals WHERE id = ?
  `;
  const values = [id];

  try {
    const [rows] = await pool.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error fetching animal by ID:", error);
    throw new Error("Failed to fetch animal from the database.");
  }
}
