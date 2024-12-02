import { BaseError } from "./base.error";

export class InternalServerError extends BaseError {

    constructor(message= "Internal Server Error") {
        super(500, message)
    }
}