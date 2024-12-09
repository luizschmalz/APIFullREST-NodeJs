import { BaseError } from "./base.error";

export class EmailAlreadyExistsError extends BaseError {
  constructor(message='Email already exists') {
    super(409, message);
  }
}