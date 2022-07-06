import  * as controller  from '../controller/EntertainmentTypesController'
import express from 'express'

const routes = express.Router()

routes.get('/all', controller.all)

export default routes