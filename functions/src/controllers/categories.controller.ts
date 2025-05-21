import { Request, Response } from 'express';
import { Category } from '../models/categories.model.js';
import { CategoryService } from '../service/categories.service.js';


export class CategoriesController{
    static async getAll(req: Request, res: Response) {
        res.send(await new CategoryService().getAll())
    }

    static async getById(req: Request, res: Response) {
        
        const categoryId = req.params.id
        res.send(await new CategoryService().getById(categoryId))
    }

    static async createCategory(req: Request, res: Response) {

        await new CategoryService().createCategory(req.body)
        res.status(201).send({
            message: "Category created",
        })
        
    }


    static async updateCategory(req: Request, res: Response) {
        
        const categoryId = req.params.id
        const category = req.body as Category
        await new CategoryService().updateCategory(categoryId, category)

        res.send({message: "Category updated"})

    }

    static async deleteCategory(req: Request, res: Response) {
        const categoryId = req.params.id
        await new CategoryService().deleteCategory(categoryId)
        res.send({message: "Category deleted"})
    }
}