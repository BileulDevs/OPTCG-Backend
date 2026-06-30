export abstract class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    code: string,
    public details?: FieldError[],
  ) {
    super(message, 400, code);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, code: string) {
    super(message, 401, code);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, code: string) {
    super(message, 403, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code: string) {
    super(message, 404, code);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code: string) {
    super(message, 409, code);
  }
}

export interface FieldError {
  field: string;
  message: string;
}
