export class NativeError extends Error {
  constructor(name: string, message: string) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NativeError);
    }

    this.name = `[${name} error]`;
  }
}
