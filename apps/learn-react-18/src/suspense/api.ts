
export const wait = async (time: number = 2000) => {
  await new Promise(resolve => setTimeout(resolve, time));
}

// Create a wrapper that supports suspense
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

