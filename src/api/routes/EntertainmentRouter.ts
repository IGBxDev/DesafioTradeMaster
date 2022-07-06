import  * as controller  from '../controller/EntertainmentController'
import express from 'express'

const routes = express.Router()

routes.get('/all', controller.all)
routes.post('/create', controller.create )
routes.get('/:name:type', controller.findByQuery)
routes.post('/rentOrSaler', controller.createOrder)
routes.put('/edit/:id', controller.editOrder)
routes.delete('/delete/:id', controller.deleteOrder)

export default routes