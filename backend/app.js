import express from 'express'
import cors from 'cors'
import animalRouter from './routes/animalRoutes.js'

// import animalRouter from ./routes/animalRoutes.js

const app = express()

app.use(cors())
app.use(express.json())

//Routes:
app.use('/animals', animalRouter)

app.use((error, req, res, next) => {
      console.error(error)
      res
            .status(error.status || 500)
            .json({error: error.message || "Server error"})
})

export default app