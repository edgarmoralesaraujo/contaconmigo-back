export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode = 400
  ) {
    super(message);
    this.name = 'CustomError';
  }
}
