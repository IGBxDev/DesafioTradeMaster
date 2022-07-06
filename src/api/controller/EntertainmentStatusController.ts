import {Request, Response} from 'express'
import { 
        all as getAll,
}  from '../../core/services/EntertainmentStatusServices'

import moment from 'moment';

export const all = async (req: Request, res: Response) => {
    try {
      const result = await getAll()
      res.status(200).send(result)
    } catch (error: any) {
        res.status(500).send({ message: error.message} )   
    }
}