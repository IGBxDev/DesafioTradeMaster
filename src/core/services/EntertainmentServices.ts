import knex from '../../database/connection'

type EntertainmentTypes = {
    Name: string,
    EntertainmentType_Id: string
}

export const create = async (payload: EntertainmentTypes ) => {
    await knex('Entertainment').insert(payload)
}