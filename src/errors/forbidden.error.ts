import { BaseError } from "./base.error";

export class ForbiddenError extends BaseError{

    constructor(message="Not allowed"){
        super(403, message)
    }
}