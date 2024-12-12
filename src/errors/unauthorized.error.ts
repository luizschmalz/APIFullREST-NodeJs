import { BaseError } from "./base.error"

export class UnauthorizedError extends BaseError {
    constructor(message="Not authorized" ) {
        super(401, message)
    }
}