import { Request, Response } from 'express';
import { OrderService } from '../service/orders.service.js';
import { Order, OrderParam } from '../models/order.model.js';


export class OrderController{

    static async createOrder(req: Request, res: Response) {
        const order =  new Order(req.body)
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

    static async getItems(req: Request, res: Response) {
        const items = await new OrderService().getItems(req.params.id)
        res.send(items)
    }

    static async getById(req: Request, res: Response) {
        const order = await new OrderService().getById(req.params.id)
        res.send(order)
    }

    static async changeStatus(req: Request, res: Response) {
        await new OrderService().changeStatus(req.params.id, req.body.status)
        res.status(200).send({
            message: "Order status changed",
        })
    }
}