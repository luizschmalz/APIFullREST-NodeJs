import express, { NextFunction, Response, Request} from 'express'
import { NotFoundError } from '../errors/not-found.error'

export const pageNotFound = (app: express.Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError("Page not found"))
    })
}