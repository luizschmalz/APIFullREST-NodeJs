import { Request, Response } from 'express';
import { Product } from '../models/product.model.js';
import { ProductService } from '../service/product.service.js';


export class ProductsController{
    static async getAll(req: Request, res: Response) {
        res.send(await new ProductService().getAll())
    }

    static async getById(req: Request, res: Response) {
        
        let productId = req.params.id
        res.send(await new ProductService().getById(productId))
    }

    static async createProduct(req: Request, res: Response) {

        await new ProductService().createProduct(req.body)
        res.status(201).send({
            message: "Product created",
        })
        
    }

    static async updateProduct(req: Request, res: Response) {
        
        let productId = req.params.id
        let product = req.body as Product
        await new ProductService().updateProduct(productId, product)

        res.send({message: "Product updated"})

    }

    static async deleteProduct(req: Request, res: Response) {
            let productId = req.params.id
            await new ProductService().deleteProduct(productId)
            res.send({message: "Product deleted"})
        }
}