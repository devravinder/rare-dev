'use client'
import { subScribeAction } from '@/actions'
import React, { useActionState } from 'react'
import { MessageTag } from './forms/InputError'
import Devider from './Devider'


export default function Footer() {

  const [state, formAction, isPending] = useActionState(subScribeAction,{})

  return (
    <div className='flex flex-col gap-20 w-full items-center'>
      <Devider/>
      <div className="flex flex-col gap-6 items-center text-center max-w-xl">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-semibold">Follow my journey</div>
          <div className="font-lora italic text-slate-500">Get notified about updates and be the first to get early access to the new, safer, and smarter way to archive your files.</div>
        </div>
        <div className="flex flex-col gap-1">
          <form action={formAction} className="border-b focus-within:border-gray-500 border-gray-300 flex flex-row justify-between items-center">
            <input required name='email' type='email' placeholder='john.doe@example.com' className='border-none w-full p-2 focus:outline-none'></input>
            <button disabled={isPending} className='text-slate-500 px-2 py-2 text-sm disabled:text-gray-400'>{'->'}</button>
          </form>
          <div className="text-xs font-lora text-slate-500 ">By subscribing to our newsletter you accept to receive recurring emails about our product and company</div>
           <MessageTag {...state} space={false}></MessageTag>
        </div>
      </div>
      <div className="text-slate-500 text-sm">
        <span>Developed by </span><span className='text-slate-700 font-semibold'>Ravinder Reddy Kothabad</span>
      </div>
    </div>
  )
}
