import { Suspense } from 'react'

type PromiseCallback = (arg: string | number | object ) => void

let pending = true;
const thenableObj = {
    then: function (resolve:PromiseCallback) {
        setTimeout(() => {
            pending = false;
            resolve('Hello, world!');
        }, 2000);
    }
}

const suspensableFunction = () => {
    if (pending) {
        pending = false
        throw thenableObj;
    }

    return ({
        id: 1,
        name: "Ramu"
    })

    // or we can throw something  as error 

}

export default function Example0() {

    return <div>
        <h2>Example 0</h2>
        <Suspense fallback={<p>Loading 0...</p>}>
            <SuspenseComponent />
        </Suspense>
    </div>
}

const SuspenseComponent = () => {

    const data = suspensableFunction()
    return <div>{data.id} : {data.name}</div>
}