import TodoForm from "@/components/TodoForm"
import TodoList from "@/components/TodoList"
import { Suspense } from "react"

export default function Home() {
  return (<div className="flex flex-col mx-auto max-w-2xl py-4">
    <div className="flex flex-col gap-8 items-center bg-white/25 rounded-lg p-8 shadow-lg">
      <h1 className="text-3xl font-bold">Simple Todo App</h1>
      <TodoForm />
      <hr className="w-full h-2" />
      <Suspense fallback={<TodosSkelton />}>
        <TodoList />
      </Suspense>
    </div>
  </div>)
}


const TodosSkelton = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="w-36 h-4 bg-gray-400 animate-pulse rounded-md">
        </div>
        <div className=" flex flex-row gap-4">
        <PulseButton />
        <PulseButton />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="w-20 h-4 bg-gray-400 animate-pulse rounded-md">
        </div>
        <div className=" flex flex-row gap-4">
        <PulseButton />
        <PulseButton />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="w-44 h-4 bg-gray-400 animate-pulse rounded-md">
        </div>
        <div className=" flex flex-row gap-4">
        <PulseButton />
        <PulseButton />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="w-16 h-4 bg-gray-400 animate-pulse rounded-md">
        </div>
        <div className=" flex flex-row gap-4">
        <PulseButton />
        <PulseButton />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="w-36 h-4 bg-gray-400 animate-pulse rounded-md">
        </div>
        <div className=" flex flex-row gap-4">
          <PulseButton />
          <PulseButton />
        </div>
      </div>
    </div>
  )
}

const PulseButton = ()=><div className="w-14 h-8 bg-gray-400 animate-pulse rounded-md"></div>




