import * as Ajv from 'ajv';
import { ErrorObject } from 'ajv';

export class ValidationError extends Error {
  public readonly payload: { errors: ErrorObject[] };

  constructor(errors: ErrorObject[]) {
    super('Validation failed');
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.payload = { errors };
  }
}

export function createValidation(schema: any) {
  const validator = new Ajv({ allErrors: true }).compile(schema);
  return (object: any) => {
    if (!validator(object)) {
      throw new ValidationError(validator.errors || []);
    }
  };
}
