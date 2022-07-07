import  * as controller  from '../controller/EntertainmentOrderController'
import express from 'express'

const routes = express.Router()

routes.get('/all', controller.all)

export default routes