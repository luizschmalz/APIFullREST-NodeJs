import { NextFunction, Request, Response } from 'express';
import {getFirestore} from 'firebase-admin/firestore'
import { ValidationError } from '../errors/validation.error';
import { NotFoundError } from '../errors/not-found.error';

type User = {
    id: number;
    name: string;
    email: string
}


export class UserController{
    static async getAll(req: Request, res: Response, next: NextFunction) {

        const snapshot = await getFirestore().collection('users').get()
        const users = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }})
        res.send(users)
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        
        let userId = req.params.id
        const doc = await getFirestore().collection("users").doc(userId).get();
        if (doc.exists) {
            res.send({
                id: doc.id,
                ...doc.data()
            })
        }else{
            throw new NotFoundError('User not found')
        }
       
    }

    static async createUser(req: Request, res: Response, next: NextFunction) {

        let user = req.body
        if (!user.name || !user.email) {
            throw new ValidationError('Name and E-mail are required')
        }
        const newUser = await getFirestore().collection('users').add(user)
        res.status(201).send({
            message: `User ${newUser.id} created`,
        })
        
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {

        let userId = req.params.id
        await getFirestore().collection('users').doc(userId).delete()
        res.status(204).end()

    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        
        let userId = req.params.id
        let user = req.body as User
        let docRef = getFirestore().collection('users').doc(userId)

        if ((await docRef.get()).exists) {
            await docRef.set({
                name: user.name,
                email: user.email
            })
        
            res.send({message: "User updated"})
        }else{
            throw new NotFoundError('User not found')
        }

    }
}