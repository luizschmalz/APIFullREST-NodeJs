import { BaseError } from "./base.error";

export class ValidationError extends BaseError {

    constructor(message: string) {
        super(400, message)
    }
}