import { BaseError } from "./base.error.js";

export class InternalServerError extends BaseError {

    constructor(message= "Internal Server Error") {
        super(500, message)
    }
}