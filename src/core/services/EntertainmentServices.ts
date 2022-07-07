import {connection} from '../../database/connection'
import { validateBody, validateQuery, validadeOrder } from '../validation/EntertainmentValidation'
import { EntertainmentTypes } from '../model/EntertainmentModel'
import { EntertainmentOrdeTypes } from '../model/EntertainmentOrderModel'
import moment from 'moment'



export const all = async () =>{
    try {
        return await connection('Entertainment')
        .select("*")
        .where("active", "=", "1")        
    } catch (error) {
        return error
    }
}

export const create = async (payload: EntertainmentTypes ) => {
    const dateNow = new Date
    let result: any
    try {
        result = await validateBody(payload)

        if(result.errors){
            throw new Error(result.message)
        }       
         
        const insert = {
            entertainmentType_Id: payload.entertainmentType_Id,
            name: payload.name
        }

         const resultInsert = await connection('Entertainment').insert(insert)

         const payloadOrder: EntertainmentOrdeTypes = {
            entertainment_Id: resultInsert[0] as number,
            entertainmentStatus_Id: payload.entertainmentStatus_Id,
            rentDays: payload.entertainmentStatus_Id === 1? payload.rentDays : 0 as number,
            user: payload.user as string,
            datePrevision: dateNow as any
         }

         result = await createOrderRentOrSaler(payloadOrder)

        if(result.errors){
            throw new Error(result.message)
        } 

        if(result.message){
            throw new Error(result.message)
        }

        return resultInsert
    } catch (error) {
        return error
    }    
}

export const findByQuery = async (payload: { name: string, type: string}) =>{
    try {
        let result: any
        
        result = await validateQuery(payload.name, payload.type)

        if(payload.name && payload.type){
            result =
             connection("Entertainment")
            .select(
                "Entertainment.id AS Id", 
                "Entertainment.name AS Titulo", 
                "EntertainmentType.description AS Type"
            )
            .innerJoin("EntertainmentType", "EntertainmentType.id", "=", "entertainmentType_Id")
            .where('Entertainment.name', 'like', `%${payload.name}%`)
            .orWhere("EntertainmentType.description", "like", `%${payload.type}%`)
        }

        if(payload.name && !payload.type){
            result =
            connection("Entertainment")
            .select(
                "Entertainment.id AS Id", 
                "Entertainment.name AS Titulo", 
                "EntertainmentType.description AS Type"
            )
            .innerJoin("EntertainmentType", "EntertainmentType.id", "=", "entertainmentType_Id")
            .where('Entertainment.name', 'like', `%${payload.name}%`)
        }
           
        if(!payload.name && payload.type){
            result =
            connection("Entertainment")
            .select(
                "Entertainment.id AS Id", 
                "Entertainment.name AS Titulo", 
                "EntertainmentType.description AS Type"
            )
            .innerJoin("EntertainmentType", "EntertainmentType.id", "=", "entertainmentType_Id")
            .where("EntertainmentType.description", "like", `%${payload.type}%`)
        }
        
        return result
    } catch (error) {
        return error
    }
}

export const createOrderRentOrSaler = async (payload: EntertainmentOrdeTypes) =>{
    try {
        const result: any = await validadeOrder(payload)

        if(result.errors){
            throw new Error(result.errors.message)
        }

        payload.datePrevision = validaDataPrevision(payload.entertainmentStatus_Id, payload.rentDays, payload.datePrevision)

        return await connection('EntertainmentOrder').insert(payload)

    } catch (error) {
        return error
    }
}


export const edit = async (payload: EntertainmentOrdeTypes, id: number) =>{
    try {

        let result: any

        result = await connection('EntertainmentOrder')
        .update({
            entertainment_Id: payload.entertainment_Id,
            entertainmentStatus_Id: payload.entertainmentStatus_Id,
            rentDays: payload.rentDays,
            user: payload.user,
            datePrevision: validaDataPrevision(payload.entertainmentStatus_Id, payload.rentDays, payload.datePrevision)
        })
        .where("id", id)

        if(result.erros){
            throw new ErrorEvent(result.message)
        }

        if(result.message){
            throw new ErrorEvent(result.message)
        }

        result = await connection('Entertainment')
        .update({ name: payload.name})
        .where("id", payload.entertainment_Id)

        if(result.erros){
            throw new ErrorEvent(result.message)
        }

        if(result.message){
            throw new ErrorEvent(result.message)
        }

        return result
    } catch (error) {
        return error
    }
} 

export const deleteItem = async (id: number) =>{
    try {
        const result = await connection('EntertainmentOrder')
        .update({
            active: 0
        })
        .where("id", id)
        return result
    } catch (error) {
        return error
    }
}

const validaDataPrevision = (entertainmentStatus_Id: number, rentDays: number, datePrevision: Date) =>{    
    //Quando for aluguel é necessário informar a quantidade de dias maior que 0.
    if(entertainmentStatus_Id === 1){
        if(rentDays === 0){
            throw new Error("Necessário informar a quantidade de dias")
        }
        
        if(rentDays > 0){
            datePrevision = moment(datePrevision, 'DD/MM/YYYY').add(rentDays, 'd').format('YYYY/MM/DD') as any
        }
    }        

    if(rentDays === 0){
        datePrevision = moment(datePrevision, 'DD/MM/YYYY').format('YYYY/MM/DD') as any
    }

    return datePrevision
}