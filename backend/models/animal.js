import pool from "../src/db.js";
import mysql2 from 'mysql2'
import { sort } from '../helpers/sort.js';
import { search } from '../helpers/search.js';
import { environment } from "../helpers/environment.js";

const RESET    = "\x1b[0m";
const YELLOW   = "\x1b[33m";
const MAGENTA  = "\x1b[35m";
const CYAN     = "\x1b[36m";
const GREEN    = "\x1b[32m";

function colorLinesGreen(text) {
  return text
    .split("\n")
    .map(line => GREEN + line + RESET)
    .join("\n");
}


// Function to create a new animal
export async function createAnimal({ vardas, rusis, svoris, aplinka, lt }) {
  const query = `
    INSERT INTO animals (vardas, rusis, svoris, aplinka, lt)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [vardas, rusis, svoris, aplinka, lt];

  try {
    const [result] = await pool.query(query, values);
        // Debuginimui -------------------------------
        console.log("----------------------------------------------")
        const fullsql = mysql2.format(query, values)
        console.log()
        console.log(`${MAGENTA}function${RESET}: ${YELLOW}createAnimal${RESET}(vardas: ${CYAN}${vardas}${RESET}, rusis: ${CYAN}${rusis}${RESET}, svoris: ${CYAN}${svoris}${RESET}, aplinka: ${CYAN}${aplinka}${RESET}, lt: ${CYAN}${lt}${RESET}): `)
        console.log()
        console.log("SQL query: ")
        console.log(colorLinesGreen(fullsql))
        console.log("Response, insert Id: ")
        console.log(`${CYAN}${result.insertId}${RESET}`)
        console.log("----------------------------------------------")
        // //--------------------------------------------
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
    // Debuginimui -------------------------------
    console.log("----------------------------------------------")
    const fullsql = mysql2.format(query)
    console.log()
    console.log(`${MAGENTA}function${RESET}: ${YELLOW}getAnimalById${RESET}(id: ${CYAN}${id}${RESET})`)
    console.log()
    console.log("SQL query: ")
    console.log(`     ${colorLinesGreen(fullsql)}`)
    console.log("Response, rows[0]: ")
    console.log(rows[0])
    console.log("----------------------------------------------")
    // //--------------------------------------------
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
      // Debuginimui -------------------------------
      console.log("----------------------------------------------")
      const fullsql = mysql2.format(query, values)
      console.log()
      console.log(`${MAGENTA}function${RESET}: ${YELLOW}updateAnimal${RESET}(id: ${CYAN}${id}${RESET}, vardas: ${CYAN}${vardas}${RESET}, rusis: ${CYAN}${rusis}${RESET}, svoris: ${CYAN}${svoris}${RESET}, aplinka: ${CYAN}${aplinka}${RESET}, lt: ${CYAN}${lt}${RESET}): `)
      console.log()
      console.log("SQL query: ")
      console.log(colorLinesGreen(fullsql))
      console.log("Response, affected rows: ")
      console.log(`${CYAN}${result.affectedRows}${RESET}`)
      console.log("----------------------------------------------")
      // //--------------------------------------------
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
    // Debuginimui -------------------------------
    console.log("----------------------------------------------")
    const fullsql = mysql2.format(query, values)
    console.log()
    console.log(`${MAGENTA}function${RESET}: ${YELLOW}removeAnimal${RESET}(id: ${CYAN}${id}${RESET})`)
    console.log()
    console.log("SQL query: ")
    console.log(colorLinesGreen(fullsql))
    console.log("Response, affected rows: ")
    console.log(`${CYAN}${result.affectedRows}${RESET}`)
    console.log("----------------------------------------------")
    //--------------------------------------------
    return result.affectedRows; // Number of rows affected
  } catch (error) {
    console.error("Error removing animal:", error);
    throw new Error("Failed to remove animal from the database.");
  }
}

// Funkcija, kuri gražina visus gyvūnus
export async function getAllAnimals(filters = {}) {
  const { clause: filterSQL, params: filterParams} = environment(filters)
  const { clause: searchSQL, params: searchParams} = search(filters)
  let whereSQL = ''
  let allParams = []

  if (filterSQL && searchSQL) {
    const stripped = filterSQL.replace(/^WHERE\s*/i, '')
    whereSQL = `${searchSQL} AND ${stripped}`
    allParams = [...searchParams, ...filterParams]
  }  
  else {
    whereSQL = filterSQL || searchSQL
    allParams = [...filterParams, searchParams]
  }

  const sortSQL = sort(filters)
  const query = `SELECT * FROM animals ${whereSQL} ${sortSQL}`.trim();

  try {
    const [rows] = await pool.query(query, allParams);
    // Debuginimui -------------------------------
    const fullsql = mysql2.format(query, allParams);
    console.log("----------------------------------------------")
    console.log(`${MAGENTA}function${RESET}: ${YELLOW}getAllAnimals${RESET}(paieska: ${CYAN}${filters.q}${RESET}, sortBy: ${CYAN}${filters.sort}${RESET}, order: ${CYAN}${filters.order}${RESET}, aplinka: ${CYAN}${filters.aplinka}${RESET}, lt: ${CYAN}${filters.lt}${RESET})`);
    console.log("SQL query: ")
    console.log(colorLinesGreen(fullsql));
    console.log("Response, rows: ")
    console.log(`${CYAN}${rows.length}${RESET} rows`)
    console.log("----------------------------------------------")
   //--------------------------------------------
    return rows;
  } catch (error) {
    console.error("Klaida gaunant visus gyvūnus:", error);
    throw new Error("Nepavyko gauti gyvūnų iš duomenų bazės.");
  }
}