import { Suspense } from 'react'
import { useSuspense } from '../lib/useSuspense';
import ErrorBoundary from '../../components/ErrorBoundary';
import { wait } from '../../util';

export default function Example22() {

    const suspensableFunction = useSuspense(()=>dummyFetch(12)); // with custom hook

    return (
        <div>
            <h2>Example 22 - Error</h2>
                <ErrorBoundary fallback={(error)=><div>Opps: {error?.message}</div>} >
                <Suspense fallback={<p>Loading 22...</p>}>
                    <SuspenseComponent suspensableFunction={suspensableFunction} />
                </Suspense>
            </ErrorBoundary>
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