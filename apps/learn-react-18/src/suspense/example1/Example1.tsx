import { Suspense } from "react";
import { withSuspense } from "../lib/useSuspense";
import { wait } from "../../util";

// Create the resource outside the component to avoid recreation on re-renders
const suspensableFunction = withSuspense(dummyFetch());

export default function Example1() {
    return (
        <div>
            <h2>Example 1</h2>
            <Suspense fallback={<p>Loading 1...</p>}>
                <SuspenseComponent />
            </Suspense>
        </div>
    )
}

const SuspenseComponent = () => {
    const data = suspensableFunction();
    return <div>{data.id} : {data.name}</div>
}


async function dummyFetch(id: number = 1) {
    await wait()
    if (id < 10) return ({
        id,
        name: "Ramu"
    })
    else throw new Error(`User not found with id: ${id}`)
}