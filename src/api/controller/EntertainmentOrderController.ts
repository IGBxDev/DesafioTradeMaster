import {Request, Response} from 'express'
import { 
        getAllOrderSaler
}  from '../../core/services/EntertainmentOrderServices'

import moment from 'moment';

export const all = async (req: Request, res: Response) => {
    try {
      const result = await getAllOrderSaler()
      res.status(200).send(result)
    } catch (error: any) {
        res.status(500).send({ message: error.message} )   
    }
}