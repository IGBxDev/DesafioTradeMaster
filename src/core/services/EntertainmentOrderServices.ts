import {connection} from '../../database/connection'


export const getAllOrderSaler = async () =>{
    try {
        return await connection('Entertainment as ent')
        .select(
            "ent.id as Entertainment_Id",
            "ent.name as Entertainment_Titulo",
            "entT.id as EntertainmentType_Id",
            "entT.description as EntertainmentType_Description",
            "entS.id as EntertainmentStatus_Id",
            "entS.description as EntertainmentStatus_Description"
        )
        .innerJoin("EntertainmentType as entT", "entT.id", "=", "ent.entertainmentType_Id")
        .innerJoin("EntertainmentOrder as entO", "entO.entertainment_Id", "=", "ent.Id")
        .innerJoin("EntertainmentStatus as entS", "entS.id", "=", "entO.entertainmentStatus_Id")
        .where("ent.active", "=", "1")
        .andWhere("entT.active", "=", "1")      
        .andWhere("entO.active", "=", "1")   
        .andWhere("entS.active", "=", "1")      
    } catch (error) {
        return error
    }
}