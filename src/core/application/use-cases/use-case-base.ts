export class UseCaseBase<T = any, R = any> {
  async execute(_: T): Promise<R> {
    throw new Error('Method not implemented.');
  }
}
