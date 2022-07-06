import {Request, Response} from 'express'
import { EntertainmentTypes } from '../../core/model/EntertainmentModel';
import { EntertainmentOrdeTypes } from '../../core/model/EntertainmentOrderModel';
import { 
        create as CreateEntertainment,
        findByQuery as findByQueryEntertainment,
        all as getAll,
        createOrderRentOrSaler,
        edit,
        deleteItem
}  from '../../core/services/EntertainmentServices'

import moment from 'moment';


export const createOrder = async (req: Request, res: Response ) =>{
    moment.locale('pt-BR');
    const dateNow = new Date
    try {
        const payload: EntertainmentOrdeTypes ={
            entertainment_Id: req.body.entertainment_Id as number,
            entertainmentStatus_Id: req.body.entertainmentStatus_Id as number,
            rentDays: req.body.rentDays as number,
            datePrevision: dateNow as any,
            user: req.body.user as string            
        }

        const result: any = await createOrderRentOrSaler(payload)

        if(result.erros){
            throw new Error(result.erros.message)
        }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(500).send({ message: error.message})
    }
}

export const editOrder = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    moment.locale('pt-BR');
    const dateNow = new Date

    const payload: EntertainmentOrdeTypes ={
        entertainment_Id: req.body.entertainment_Id as number,
        entertainmentStatus_Id: req.body.entertainmentStatus_Id as number,
        rentDays: req.body.rentDays as number,
        datePrevision: dateNow as any,
        user: req.body.user as string            
    }
    try {
        const result = await edit(payload, id)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

export const deleteOrder = async (req: Request, res: Response) =>{
    const id = Number(req.params.id)
    try {
        await deleteItem(id)
        res.status(200).send({message: 'sucess'})
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

export const all = async (req: Request, res: Response) => {
    try {
      const result = await getAll()
      res.status(200).send(result)
    } catch (error: any) {
        res.status(500).send({ message: error.message} )   
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const payload = {
            name: req.body.name as string,
            entertainmentType_Id: req.body.entertainmentType_Id as number,
            entertainmentStatus_Id: req.body.entertainmentStatus_Id as number,
            user: req.body.user
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

export const findByQuery = async (req: Request, res: Response) =>{
    try {
        const payload = {
            name: req.query.name as string,
            type: req.query.type as string
        }

        const result = await findByQueryEntertainment(payload)

        if(result.message){
            throw new Error(result.message)
        }

        res.status(200).send(result)
    } catch (error: any) {
        res.status(500).send({ message: error.message})
    }
}