"use client"

import { toggleStatusAction } from '@/actions/todoActions'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const TodoItem = ({ title, status, id }: Todo) => {
  const router = useRouter()
  const [error, setError] = useState('');

  const [isPending, startTransition] = useTransition();

  const deleteTodo = async () => {
    startTransition(async () => {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })
  
      router.refresh()
    })

  }

  const toggleStatus = async () => {
    startTransition(async () => {
      const { error, message } = await toggleStatusAction(id);
      if (error){
        setError(message)
        clearError()
      }
    })
  }

  const clearError=()=>{
    setTimeout(() => {
      setError('')
    },4000)
  }

  return <>
    <div className="flex flex-col gap-1">
    <div className="flex flex-row gap-4 items-center justify-between">
      <div className={status === 'completed' ? "line-through decoration-green-500" : ""}>{title}</div>
      <div className="flex flex-row gap-4">
        <button disabled={isPending} onClick={deleteTodo} className="bg-red-500 disabled:bg-red-400 px-2 py-1 rounded-md">{isPending ? "Wait.." : "Delete"}</button>
        <button disabled={isPending} onClick={() => toggleStatus()} className="bg-green-500 disabled:bg-green-400 px-2 py-1 rounded-md min-w-20">{isPending ? "Wait.." : `${status === 'completed' ? 'Undone' : 'Done'}`}</button>
      </div>
    </div>
    <div className="text-red-500">{error}</div>
    </div>
  </>
}

export default TodoItem;