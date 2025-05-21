import express, {Request, Response, NextFunction} from 'express'
import { InternalServerError } from '../errors/internal-server.error.js'
import { errors } from 'celebrate'
import { BaseError } from '../errors/base.error.js'

export const errorHandler = (app: express.Express) => {
    app.use(errors())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof BaseError) {
            error.send(res)
        }
        else{
            new InternalServerError().send(res)
        }
    })
}