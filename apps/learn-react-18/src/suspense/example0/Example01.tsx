import { Suspense } from "react";
type PromiseCallback = (arg: string | number | object ) => void

let pending = true;

const pendingPromise = new Promise((resolve:PromiseCallback) => {
    setTimeout(() => {
        resolve('Hello, world!');
        pending = false

    }, 2000);
})

const suspensableFunction = () => {
    if (pending) {
        pending = false
        throw pendingPromise;
    }
    return ({
        id: 1,
        name: "Ramu"
    })

}

export default function Example01() {
  
    return <div>
        <h2>Example 01</h2>
        <Suspense fallback={<p>Loading 01...</p>}>
            <SuspenseComponent />
        </Suspense>
    </div>
}

const SuspenseComponent = () => {
    const data =  suspensableFunction();
    return <div>{data.id} : {data.name}</div>
}