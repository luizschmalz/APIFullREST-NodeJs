import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service.js';

export class AuthController{
    static async login(req: Request, res: Response){
        
        const UserRecord = await new AuthService().login(req.body.email, req.body.password)
        
        const token = await UserRecord.user.getIdToken(true)

        res.json({
            token: token
        })

    }

    static async signin(req: Request, res: Response){
        const UserRecord = await new AuthService().signin()
        const token = await UserRecord.user.getIdToken(true)
        res.send({
            token: token
        })

    }

    static async recovery(req: Request, res: Response){
        const {email} = req.body
        await new AuthService().recovery(email)
        res.end()
    }
}