export class MissingAggregateRootError extends Error {
  constructor(id: string) {
    super(`Missing aggregate root with id ${id}`);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class AlreadyExistingAggregateRootError extends Error {
  constructor(id: string) {
    super(`Aggregate root with id ${id} already exists`);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
