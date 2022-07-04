import {connection} from '../../database/connection'
import { validateBody, validateParams, validateQuery  } from '../validation/EntertainmentValidation'
import { EntertainmentTypes } from '../model/EntertainmentModel'

export const create = async (payload: EntertainmentTypes ) => {
    try {
        const result = await validateBody(payload)

        if(result.errors){
            throw new Error(result.message)
        }

        return await connection('Entertainment').insert(payload)
    } catch (error) {
        return error
    }    
}

export const findByName = async (name: string) =>{
    try {
        const result  =
            connection('Entertainment')
            .select("*")
            .where({ name: name})
        return result
    } catch (error) {
        return error
    }
}

export const findByType = async (entertainmentType_Id: string) =>{
    try {
        const result = 
            connection('EntertainmentOrder')
            .select("*")
            .where({ entertainmentType_Id: entertainmentType_Id })    
        return result
    } catch (error) {
        return error

    }
}