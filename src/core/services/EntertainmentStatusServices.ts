import {connection} from '../../database/connection'


export const all = async () =>{
    try {
        return await connection('EntertainmentStatus')
        .select("*")
        .where("active", "=", "1")        
    } catch (error) {
        return error
    }
}