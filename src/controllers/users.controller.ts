import { Request, Response } from 'express';
import {getFirestore} from 'firebase-admin/firestore'

type User = {
    id: number;
    name: string;
    email: string
}


export class UserController{
    static async getAll(req: Request, res: Response) {
        const snapshot = await getFirestore().collection('users').get()
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }})
        res.send(users)

    }

    static async getById(req: Request, res: Response) {
        let userId = req.params.id
        const doc = await getFirestore().collection("users").doc(userId).get();
        let user = {
            id: doc.id,
            ...doc.data()
        }
        res.send(user)
    }

    static async createUser(req: Request, res: Response) {
        let user = req.body
        const newUser = await getFirestore().collection('users').add(user)
        res.status(201).send({
            message: `user ${newUser.id} created`,
        })
    }

    static async deleteUser(req: Request, res: Response) {
        let userId = req.params.id
        await getFirestore().collection('users').doc(userId).delete()
        res.status(204).end()
    }

    static async updateUser(req: Request, res: Response) {
        let userId = req.params.id
        let user = req.body as User
        await getFirestore().collection('users').doc(userId).set({
            name: user.name,
            email: user.email
        })
        res.send('Usuario atualizado')
    }
}