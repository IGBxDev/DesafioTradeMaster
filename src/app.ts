import express, { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from './swagger.json'
// import swaggerJsDoc  from 'swagger-jsdoc'

import cors from 'cors'

import EntertainmentRouter from './api/routes/EntertainmentRouter'

const app = express()
app.use(express.json())
app.use(cors({origin: "*", credentials: true})) //define que qualquer url pode acessar essa api

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//     swaggerDefinition: {
//       info: {
//         version: "1.0.0",
//         title: "Customer API",
//         description: "Customer API Information",
//         contact: {
//           name: "Amazing Developer"
//         },
//         servers: ["http://localhost:5000"]
//       }
//     },
//     //['.routes/*.js']
//     apis: ["**/*.ts"]
//   };

  // const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use('/entertainment', EntertainmentRouter)


export default app