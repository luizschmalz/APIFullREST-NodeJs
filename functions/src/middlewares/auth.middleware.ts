import express, {Response, Request, NextFunction} from 'express'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import { UserService } from '../service/user.service.js'
import { ForbiddenError } from '../errors/forbidden.error.js'
import { NotFoundError } from '../errors/not-found.error.js'

export const auth = ( app: express.Express ) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (clearRoute(req)) {
            return next()
        }

        
        const token = req.headers.authorization?.split('Bearer ')[1]
        if(token){
            
            try{
                const decodeIdToken:DecodedIdToken = await getAuth().verifyIdToken(token)

                if(decodeIdToken.firebase.sign_in_provider == "anonymous"){
                    return next()
                }
                
                req.user = await new UserService().getById(decodeIdToken.uid)

            return next()
            }
            catch(error){
                if(error instanceof NotFoundError){
                    return next(new ForbiddenError())
                }else{
                    next(new UnauthorizedError())
                }
            }
        }

        next(new UnauthorizedError())
    })
    
    const clearRoute = (req: Request): boolean =>{
        if (req.method == "POST"){
            if(req.url.startsWith("/auth/login") || 
                req.url.startsWith("/auth/recovery") || 
                req.url.startsWith("/auth/signin")){
                return true
            }
        }
        return false
    
    }
}