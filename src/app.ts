import express, { Request, Response } from 'express'
// import swaggerUi from 'swagger-ui-express'
// import swaggerOptions from './swagger.json'
// import swaggerJsDoc  from 'swagger-jsdoc'

import cors from 'cors'

import EntertainmentRouter from './api/routes/EntertainmentRouter'
import EntertainmentTypesRouter from './api/routes/EntertainmentTypesRouter'
import EntertainmentStatusRouter from './api/routes/EntertainmentStatusRouter'
import SwaggerRouter from './api/routes/SwaggerRouter'

const app = express()
app.use(express.json())
app.use(cors({origin: "*", credentials: true})) //define que qualquer url pode acessar essa api

app.use('/', SwaggerRouter)
app.use('/entertainment', EntertainmentRouter)
app.use('/entertainmentTypes', EntertainmentTypesRouter)
app.use('/entertainmentStatus', EntertainmentStatusRouter)


export default app