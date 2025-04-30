import { Request, Response } from 'express';
import { OrderService } from '../service/orders.service.js';
import { Order, OrderParam } from '../models/order.model.js';


export class OrderController{

    static async createOrder(req: Request, res: Response) {
        const order = req.body as Order
        await new OrderService().createOrder(order)
        res.status(201).send({
            message: "Order created",
        }) 
    }
    
    static async getAllOrders(req: Request, res: Response) {
        const params = req.query as OrderParam
        const orders = await new OrderService().getAllOrders(params)
        res.status(200).send(orders)
    }
}