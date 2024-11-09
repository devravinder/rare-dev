import {  useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";


const __UNDEFINED__ = "__UNDEFINED__"; // to support undefined values // tanstack query won't support undefined

export const useLocalStorage = <T>(key: string, initialValue?: T | (() => T)): [T, (value: T) => void] => {
    return useBrowserStorage(key, window.localStorage, initialValue);
  }

  export const useSessionStorage = <T>(key: string, initialValue?: T | (() => T)): [T, (value: T) => void] => {
    return useBrowserStorage(key, window.sessionStorage, initialValue);
  }

 export const useBrowserStorage = <T>(key: string, storage: Storage, initialValue?: T | (() => T)): [T, (value: T) => void] => {

   const queryClient = useQueryClient();

    const loadValue = () => {
        const previous = storage.getItem(key);
        if (previous != null) return JSON.parse(previous) as T;
        if (typeof initialValue === "function") {
          return (initialValue as () => T)();
        } else {
          return initialValue || (__UNDEFINED__ as T);
        }
      }
  
    
      // reactQuery with suspense:true
      const query = useSuspenseQuery({ queryKey: [key], initialData: loadValue, staleTime: Infinity });
    
      const mutation = useMutation({
        mutationFn: async (value:T) => {
          
          if(value == undefined){
            storage.removeItem(key);
            queryClient.setQueryData([key], __UNDEFINED__ as T);

            return
          }
          queryClient.setQueryData([key], value);
          storage.setItem(key, JSON.stringify(value))
        }
      })
    
      return [query.data == __UNDEFINED__ ? (undefined as T) : query.data, mutation.mutate]
  }