class CustomError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(`${message}`);
    this.message = message;
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
