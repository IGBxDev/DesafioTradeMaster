import * as Yup from 'yup'
import { EntertainmentTypes } from '../model/EntertainmentModel'

const schema = Yup.object().shape({
        body: Yup.object({
            name: Yup.string().required(),
            entertainmentType_Id: Yup.number().required().typeError("Necessário infromar um Id para entertainmentType_Id")
            }),
        // params: Yup.object().shape({
        //     id: Yup.number().required()
        // })
        // query: Yup.object({
        //     name: Yup.string().required()
        // })

    })
  


export const validateBody = async (payload: EntertainmentTypes) => {
   const result = await schema.validate({ body: payload})
   return result
}


export const validateParams = async (id: number) => {
    const result = await schema.validate({ id: id})
    return result
}

 export const validateQuery = async (query: string) => {
    const result = await schema.validate({ query: query})
    return result
 }