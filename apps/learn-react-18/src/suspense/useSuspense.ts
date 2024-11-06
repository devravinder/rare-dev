import { useState } from 'react';
import { withSuspense } from './api';

export function useSuspense<T>(fetchFn: () => Promise<T>) {
  const [resource] = useState(() => withSuspense(fetchFn()));
  return resource;
}