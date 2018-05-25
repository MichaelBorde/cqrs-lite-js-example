export class MissingAggregateRootError extends Error {
  public readonly payload: { id: string };

  constructor(id: string) {
    super(`Missing aggregate root with id ${id}`);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.payload = { id };
  }
}

export class AlreadyExistingAggregateRootError extends Error {
  constructor(id: string) {
    super(`Aggregate root with id ${id} already exists`);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class QuieriedObjectNotFoundError extends Error {
  public readonly payload: any;

  constructor(criteria: any) {
    super(`Quieried object not found`);
    this.payload = criteria;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
