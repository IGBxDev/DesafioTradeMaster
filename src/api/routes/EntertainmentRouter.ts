import { getAllEntertainment, createEntertainment } from '../controller/EntertainmentController'
import express from 'express'

const routes = express.Router()

routes.get('/all', getAllEntertainment)
routes.post('/create', createEntertainment )

export default routes