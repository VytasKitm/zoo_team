import app from './app.js'
import testData from './database/testData.js'
import pool from './db.js'

import dotenv from 'dotenv'
dotenv.config()
const {
      port,
      host,
      db_port,
      db_host,
} = process.env


async function startServer() {
      try {

            const connection = await pool.getConnection()
            console.log(`Database connection at ${db_host}, port: ${db_port} established`)
            connection.release()

            app.listen(port, () => {
            console.log(`Server started at http://${host}:${port}`)
            })
      } catch (error) {
            console.log(`Failed to start server: ${error}`)
      }
}

startServer()
testData()