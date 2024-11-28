import { Request, Response } from 'express';

type User = {
    id: number;
    name: string;
    email: string
}

let id = 0
let users: User[] = []

export class UserController{
    static getAll(req: Request, res: Response) {
        res.send(users)
    }

    static getById(req: Request, res: Response) {
        let userId = Number(req.params.id)
        let user = users.find(user => user.id === userId)
        res.send(user)
    }

    static createUser(req: Request, res: Response) {
        let user = req.body
        user.id = ++id
        console.log(user)
        users.push(user)
        res.send('Usuario criado')
    }

    static deleteUser(req: Request, res: Response) {
        let userId = Number(req.params.id)
        users = users.filter(user => user.id !== userId)
        res.send('Usuario deletado')
    }

    static updateUser(req: Request, res: Response) {
        let userId = Number(req.params.id)
        let user = req.body
        let index = users.findIndex((_user: User) => _user.id === userId)
        console.log(user)
        users[index].name = user.name
        users[index].email = user.email
        res.send('Usuario atualizado')
    }
}