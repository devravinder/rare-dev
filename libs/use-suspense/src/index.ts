import { useState } from "react";

  /**
   * This function takes a promise and returns a function, that when called,
   * will throw the promise if it is pending, throw the error if it is rejected,
   * or return the resolved value if it is resolved.
   * 
   * This is useful for converting promises to suspensable functions,
   * which can be used to create suspense boundaries.
   * 
   * @example
   * const suspensableFunction = withSuspense(fetchData())
   * 
   * @param {Promise<T>} promise
   * @returns {() => Promise<T>}
   */
export const withSuspense = <T>(promise: Promise<T>) => {
    let status = 'pending';
    let result: T;
    const suspender = promise.then(
      (r) => {
        status = 'success';
        result = r;
      },
      (e) => {
        status = 'error';
        result = e;
      }
    );
  
    return function(){
        switch(status){
          case 'pending':
            throw suspender;
          case 'error':
            throw result;
          default:
            return result;
        }
      }
  }

/**
 * A custom hook that converts a promise-returning function into a suspensable resource.
 * It initializes the resource state using a suspensable version of the promise,
 * allowing the component to suspend rendering until the promise resolves.
 *
 * @template T - The type of the data returned by the promise.
 * @param {() => Promise<T>} fetchFn - A function that returns a promise, which resolves
 * to the data expected from the asynchronous operation.
 * @returns {T} - The data resolved from the promise, or throws an error if the promise is rejected.
 */
export function useSuspense<T>(fetchFn: () => Promise<T>) {
    const [resource] = useState(() => withSuspense(fetchFn()));
    return resource;
  }

export default useSuspense;  