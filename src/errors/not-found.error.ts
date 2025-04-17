import { BaseError } from "./base.error.js";

export class NotFoundError extends BaseError {

    constructor(message: string) {
        super(404, message)
    }
    
}