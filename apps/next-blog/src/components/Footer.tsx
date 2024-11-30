import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col gap-20 w-full items-center'>
      <div className="border-b border-gray-300 w-1/3 rounded-lg"></div>
      <div className="flex flex-col gap-6 items-center text-center max-w-xl">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-semibold">Follow my journey</div>
          <div className="font-lora italic text-slate-500">Get notified about updates and be the first to get early access to the new, safer, and smarter way to archive your files.</div>
        </div>
        <div className="flex flex-col gap-1">
          <form className="border-b border-gray-300 flex flex-row justify-between items-center">
            <input required type='email' placeholder='john.doe@example.com' className='border-none w-full p-2 focus:outline-none'></input>
            <button className='text-slate-500 px-2 py-2 text-sm'>{'->'}</button>
          </form>

          <div className="text-xs font-lora text-slate-500 ">By subscribing to our newsletter you accept to receive recurring emails about our product and company</div>
        </div>
      </div>
      <div className="text-slate-500 text-sm">
        <span>Developed by </span><span className='text-slate-700 font-semibold'>Ravinder Reddy Kothabad</span>
      </div>
    </div>
  )
}
