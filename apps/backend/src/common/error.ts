export class RecordAlreadyExists extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RecordAlreadyExists.prototype);
  }
}

export class RecordNotFound extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RecordNotFound.prototype);
  }
}

export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

export class PermissionError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, PermissionError.prototype);
  }
}

export class FailedRelationConstraintError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, FailedRelationConstraintError.prototype);
  }
}

export class BusinessLogicError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BusinessLogicError.prototype);
  }
}
