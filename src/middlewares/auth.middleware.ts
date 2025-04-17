import express, {Response, Request, NextFunction} from 'express'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import { UserService } from '../service/user.service.js'
import { ForbiddenError } from '../errors/forbidden.error.js'

export const auth = ( app: express.Express ) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (req.method == "POST" && req.url.endsWith("/auth/login") || req.url.endsWith("/auth/recovery")) {
            return next()
        }
        
        const token = req.headers.authorization?.split('Bearer ')[1]
        if(token){
            
            try{
                const decodeIdToken:DecodedIdToken = await getAuth().verifyIdToken(token)
                
                const user = await new UserService().getById(decodeIdToken.uid)

                if(!user){
                    return next(new ForbiddenError())
                }
                req.user = user

            return next()
            }
            catch(error){
                next(new UnauthorizedError())
            }
        }

        next(new UnauthorizedError())
    })
}