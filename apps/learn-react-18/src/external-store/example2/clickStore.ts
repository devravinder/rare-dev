import { createSharedState } from "../lib/store";

const intialState = { count: 0 }; // const intialState = 0;
export const useCounterState = createSharedState(intialState);
