import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from '../../swagger.json'


const routes = express.Router()

routes.use('/api-docs', swaggerUi.serve)
routes.get('/api-docs', swaggerUi.setup(swaggerOptions))

export default routes