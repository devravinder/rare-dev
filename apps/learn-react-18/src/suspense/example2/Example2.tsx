import { Suspense, useState } from 'react'
import { withSuspense } from '../lib/useSuspense';
import { wait } from '../../util';

export default function Example2() {

    const [suspensableFunction] = useState(() => withSuspense(dummyFetch())); // to call only once
    return (
        <div>
            <h2>Example 2</h2>
            <Suspense fallback={<p>Loading 2...</p>}>
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