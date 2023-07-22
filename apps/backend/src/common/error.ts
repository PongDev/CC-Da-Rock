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

export class DatabaseError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, DatabaseError.prototype);
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

export class EmailNotSentError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, EmailNotSentError.prototype);
  }
}

export class EmailHasBeenSent extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, EmailHasBeenSent.prototype);
  }
}
