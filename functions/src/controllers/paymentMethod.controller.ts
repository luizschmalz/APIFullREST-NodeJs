import { Request, Response } from 'express';
import { PaymentMethod } from '../models/paymentMethod.model.js';
import { PaymentService } from '../service/paymentMethod.service.js';


export class PaymentsController{
    static async getAll(req: Request, res: Response) {
        res.send(await new PaymentService().getAll())
    }

    static async getById(req: Request, res: Response) {
        
        const paymentId = req.params.id
        res.send(await new PaymentService().getById(paymentId))
    }

    static async createPayment(req: Request, res: Response) {

        await new PaymentService().createPayment(req.body)
        res.status(201).send({
            message: "Payment created",
        })
        
    }


    static async updatePayment(req: Request, res: Response) {
        
        const paymentId = req.params.id
        const payment = req.body as PaymentMethod
        await new PaymentService().updatePayment(paymentId, payment)

        res.send({message: "Payment updated"})

    }

    static async deletePayment(req: Request, res: Response) {
        const paymentId = req.params.id
        await new PaymentService().deletePayment(paymentId)
        res.send({message: "Payment deleted"})
    }
}