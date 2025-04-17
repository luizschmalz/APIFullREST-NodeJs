import { BaseError } from "./base.error.js";

export class ValidationError extends BaseError {

    constructor(message: string) {
        super(400, message)
    }
}