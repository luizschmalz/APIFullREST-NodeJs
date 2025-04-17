import { BaseError } from "./base.error.js"

export class UnauthorizedError extends BaseError {
    constructor(message="Not authorized" ) {
        super(401, message)
    }
}