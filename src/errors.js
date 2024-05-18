export class AbstractError extends Error {
  constructor() {
    super('must be implemented by subclass!')
  }
}