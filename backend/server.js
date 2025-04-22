import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
// import database is db.js

const port = process.env.PORT
const host = process.env.HOST

async function startServer() {
      try {

            //prisijungti prie db

            app.listen(port, () => {
            console.log(`Server started at http://${host}:${port}`)
            })
      } catch (error) {
            console.log(`Failed to start server: ${error}`)
      }
}

startServer()