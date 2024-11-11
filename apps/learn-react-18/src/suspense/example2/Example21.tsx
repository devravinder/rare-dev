import { Suspense } from 'react'
import { useSuspense } from '../lib/useSuspense';
import { wait } from '../../util';

export default function Example21() {

    const suspensableFunction = useSuspense(dummyFetch); // with custom hook

    return (
        <div>
            <h2>Example 21</h2>
            <Suspense fallback={<p>Loading 21...</p>}>
                <SuspenseComponent suspensableFunction={suspensableFunction} />
            </Suspense>
        </div>
    )
}



const SuspenseComponent = ({ suspensableFunction }: SuspenseComponentProps) => {
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

type User = Awaited< ReturnType<typeof dummyFetch>>

type SuspenseComponentProps = {
    suspensableFunction: () => User
};