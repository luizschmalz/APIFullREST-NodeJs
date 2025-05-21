import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/forbidden.error.js";

export const allowAnonymousUser = (req: Request, res:Response, next: NextFunction) => {
    if(req.user){
        console.log(req.user)
        return next()
    }
    if(req.method =="GET"){ 
        if(req.url === '/companies' || 
            req.url === '/products' || 
            req.url === '/categories' || 
            req.url === '/payment' ||
            req.url.startsWith('/orders/')
         ){
            return next()
        }
    }else if(req.method == "POST"){
        if(req.url ==='/orders'){
            return next()
        }
    }
    next(new ForbiddenError("You do not have permission to access this resource"))
    
}