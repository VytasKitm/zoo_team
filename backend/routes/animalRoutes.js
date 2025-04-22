import express from 'express'
import { create } from '../controllers/animalController.js'

const animalRouter = express.Router()

animalRouter.route('/').post(create)

export default animalRouter