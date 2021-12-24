// https://stackoverflow.com/a/44158570/9184658

/**
 * Time the execution of an async function.
 * @param fn the function to time
 * @returns the time taken to execute in milliseconds
 */
export function measureAsyncFn(fn: () => Promise<any>): Promise<number> {
  let onPromiseDone = () => performance.now() - start;

  let start = performance.now();
  return fn().then(onPromiseDone, onPromiseDone);
}
