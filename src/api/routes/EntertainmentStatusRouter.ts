import  * as controller  from '../controller/EntertainmentStatusController'
import express from 'express'

const routes = express.Router()

routes.get('/all', controller.all)

export default routes