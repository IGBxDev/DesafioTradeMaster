import {Request, Response} from 'express'
import { EntertainmentTypes } from '../../core/model/EntertainmentModel';
import { 
        create as CreateEntertainment,
        findByName as findByNameEntertainment,
        findByType as findByTypeeEntertainment
}  from '../../core/services/EntertainmentServices'

export const all = async (req: Request, res: Response) => {
    const payload = {
        name:  req.body.Name as string,
        entertainmentType_Id: req.body.EntertainmentType_Id as number
    }
    
    try {
       await  CreateEntertainment(payload);
    } catch (error) {
        
    }
    res.status(200).send({ Id: 1, Name: 'Spider Man', Type: 1 })
}

export const create = async (req: Request, res: Response) => {
    try {
        const payload: EntertainmentTypes = {
            name: req.body.name as string,
            entertainmentType_Id: req.body.entertainmentType_Id as number
        }        
        const result: any = await CreateEntertainment(payload);

        if(result.errors){
            throw new Error(result.message)
        }
        
        res.status(200).send({ description: 'OK', response: result })
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}


export const findByName = async (req: Request, res: Response) =>{
    try {
        const name = req.query.name as string

        const result = await findByNameEntertainment(name)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const findByType = async (req: Request, res: Response) =>{
    try {
        const id = req.query.id as any        
        findByTypeeEntertainment(id);

    } catch (error) {
        
    }
}