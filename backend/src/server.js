import app from './app.js'
import pool from './db.js'
import dotenv from 'dotenv'
dotenv.config()

const {
      PORT,
      HOST,
      DB_PORT,
      DB_HOST,
} = process.env


async function startServer() {
      try {

            const connection = await pool.getConnection()
            console.log(`Database connection at ${DB_HOST}, port: ${DB_PORT} established`)
            connection.release()

            app.listen(PORT, () => {
            console.log(`Server started at http://${HOST}:${PORT}`)
            })
      } catch (error) {
            console.log(`Failed to start server: ${error}`)
      }
}

startServer()


