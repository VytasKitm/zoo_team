import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import animalRouter from '../routes/animalRoutes.js'

// import animalRouter from ./routes/animalRoutes.js

const app = express()

app.use(
    morgan(
        'Received request \x1b[32m:method\x1b[36m :url\x1b[33m :status\x1b[0m'
    )
);


app.use(cors())

app.use(express.json())

//Routes:
app.use('/animals', animalRouter)

app.use((error, res) => {
      console.error(error)
      res
            .status(error.status || 500)
            .json({error: error.message || "Server error"})
})

export default app