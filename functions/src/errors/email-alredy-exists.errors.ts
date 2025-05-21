import { BaseError } from "./base.error.js";

export class EmailAlreadyExistsError extends BaseError {
  constructor(message='Email already exists') {
    super(409, message);
  }
}