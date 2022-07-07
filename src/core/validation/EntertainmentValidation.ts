import * as Yup from 'yup'
import { EntertainmentTypes } from '../model/EntertainmentModel'
import { EntertainmentOrdeTypes } from '../model/EntertainmentOrderModel'

const schemaBody = Yup.object().shape({
    name: Yup.string().required().typeError("Necessário informar um nome"),
    entertainmentType_Id: Yup.number().required().typeError("Necessário infromar um Id para entertainmentType_Id")
})  

const schemaQuery = Yup.object().shape({
    name: Yup.string(),
    type: Yup.string(),
})  

const schemaOrder = Yup.object().shape({
    entertainment_Id: Yup.number().required().typeError("Necessário informar entertainment_Id"),
    entertainmentStatus_Id: Yup.number().required().typeError("Necessário informar entertainmentStatus_Id"),
    rentDays: Yup.number().required().typeError("Necessário informar rentDays"),
    user: Yup.string().required().typeError("Necessário informar user"),
    datePrevision: Yup.date().required()
})

export const validateBody = async (payload: EntertainmentTypes) => {
   const result = await schemaBody.validate(payload)
   return result
}

export const validateQuery = async (name: string, type: string) => {
    const result = await schemaQuery.validate({ 
        name: name, 
        type: type 
    }, {abortEarly: false}).then(() =>{
        if(name === "" && type === ""){
            throw new Error("Necessário informar um nome ou um tipo")
        }
    })
    return result
}

export const validadeOrder = async (payload: EntertainmentOrdeTypes) =>{
    const result = await schemaOrder.validate(payload)
    return result
}