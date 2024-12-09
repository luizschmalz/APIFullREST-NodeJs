import express, {Request, Response, NextFunction} from 'express'
import { InternalServerError } from '../errors/internal-server.error'
import { errors } from 'celebrate'
import { BaseError } from '../errors/base.error'

export const errorHandler = (app: express.Express) => {
    app.use(errors())
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof BaseError) {
            error.send(res)
        }
        else{
            new InternalServerError().send(res)
        }
    })
}