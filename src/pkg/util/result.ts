export interface Result<T> {
  error?: Error;
  data?: T;
}
