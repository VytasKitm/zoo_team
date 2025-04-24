import pool from "../db.js";

// Function to create a new animal
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

// Function to update an animal's information by ID
export async function updateAnimal(id, { vardas, rusis, svoris, aplinka, lt }) {
  const query = `
    UPDATE animals
    SET vardas = ?, rusis = ?, svoris = ?, aplinka = ?, lt = ?
    WHERE id = ?
  `;
  const values = [vardas, rusis, svoris, aplinka, lt, id];

  try {
    const [result] = await pool.query(query, values);

    // If no rows were affected, it means the animal with the given ID doesn't exist
    if (result.affectedRows === 0) {
      return null;
    }

    return result.affectedRows; // Number of rows affected
  } catch (error) {
    console.error("Error updating animal:", error);
    throw new Error("Failed to update animal in the database.");
  }
}

// Function to remove an animal by ID
export async function removeAnimal(id) {
  const query = `
    DELETE FROM animals WHERE id = ?
  `;
  const values = [id];

  try {
    const [result] = await pool.query(query, values);

    // If no rows were affected, it means the animal with the given ID doesn't exist
    if (result.affectedRows === 0) {
      return null;
    }

    return result.affectedRows; // Number of rows affected
  } catch (error) {
    console.error("Error removing animal:", error);
    throw new Error("Failed to remove animal from the database.");
  }
}

// Funkcija, kuri gražina visus gyvūnus
export async function getAllAnimals() {
  const query = `SELECT * FROM animals`;

  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Klaida gaunant visus gyvūnus:", error);
    throw new Error("Nepavyko gauti gyvūnų iš duomenų bazės.");
  }
}
