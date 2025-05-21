import { Request, Response } from 'express';
import { UserService } from '../service/user.service.js';


export class UserController{
    static async getAll(req: Request, res: Response) {
        res.send(await new UserService().getAll())
    }

    static async getById(req: Request, res: Response) {
        
        const userId = req.params.id
        res.send(await new UserService().getById(userId))
    }

    static async createUser(req: Request, res: Response) {

        await new UserService().createUser(req.body)
        res.status(201).send({
            message: "User created",
        })
        
    }

    static async deleteUser(req: Request, res: Response) {

        const userId = req.params.id
        await new UserService().deleteUser(userId)
        res.status(204).end()

    }

    static async updateUser(req: Request, res: Response) {
        
        const userId = req.params.id
        const user = req.body
        await new UserService().updateUser(userId, user)

        res.send({message: "User updated"})

    }
}