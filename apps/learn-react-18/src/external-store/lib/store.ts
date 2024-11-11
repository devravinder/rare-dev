import { useSyncExternalStore } from 'react';

type Listener = () => void;

export class Store<T> {
    private state: T;
    private listeners: Set<Listener>;

    constructor(initialState: T) {
        this.state = initialState;
        this.listeners = new Set();
    }

    getState(): T {
        return this.state;
    }

    setState(nextState: Partial<T> | ((prev: T) => T)): void {
        this.state = typeof nextState === 'function'
            ? (nextState as (prev: T) => T)(this.state)
            : (typeof nextState === 'object' ? ({ ...this.state, ...nextState }) : nextState);
        this.notify();
    }

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notify(): void {
        this.listeners.forEach(listener => listener());
    }
}
export const createSharedState = <T>(initialState: T) => {

    const store = new Store(initialState);
    function useSharedState(): [T, (nextState: Partial<T> | ((prev: T) => T)) => void] {
        const state = useSyncExternalStore(
            store.subscribe.bind(store),
            store.getState.bind(store)
        );

        return [state, store.setState.bind(store)]
    }

    return useSharedState
};