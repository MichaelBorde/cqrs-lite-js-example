import * as Ajv from 'ajv';
import { ValidateFunction } from 'ajv';

export function createValidator(schema: any): ValidateFunction {
  return new Ajv({ allErrors: true }).compile(schema);
}
