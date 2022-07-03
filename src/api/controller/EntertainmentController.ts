import {Request, Response} from 'express'
import { create }  from '../../core/services/EntertainmentServices'

export const getAllEntertainment = (req: Request, res: Response) => {
    const payload = {
        Name:  req.body.Name as string,
        EntertainmentType_Id: req.body.EntertainmentType_Id as string
    }
    
    try {
        create(payload);
    } catch (error) {
        
    }
    res.status(200).send({ Id: 1, Name: 'Spider Man', Type: 1 })
}

export const createEntertainment = (req: Request, res: Response) => {
    const { name, type } = req.body
}