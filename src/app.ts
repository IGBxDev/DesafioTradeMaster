import express, { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

import cors from 'cors'

import EntertainmentRouter from './api/routes/EntertainmentRouter'

const app = express()
app.use(express.json())
app.use(cors({origin: "*", credentials: true})) //define que qualquer url pode acessar essa api
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
//My routes here
app.use('/entertainment', EntertainmentRouter)


export default app