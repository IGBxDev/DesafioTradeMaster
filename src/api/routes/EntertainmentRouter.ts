import { all, create, findByName, findByType } from '../controller/EntertainmentController'
import express from 'express'

const routes = express.Router()

routes.get('/all', all)
routes.post('/create', create )
routes.get('/:name', findByName)
routes.get('/findById/:id', findByType)


export default routes