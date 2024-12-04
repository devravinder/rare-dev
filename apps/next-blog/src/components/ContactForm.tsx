'use client'
import { ApiMessage } from '@/actions'
import InputError, { MessageTag } from '@/components/forms/InputError'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

// Define Zod schema for validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});


type Inputs = z.infer<typeof schema>;

export default function ContactForm() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  });

  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<ApiMessage>({})


  const onSubmit: SubmitHandler<Inputs> = payload => {
    startTransition(async() => {
     try {
      await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      /* 
      const data = await res.json()
      console.log(data)
       */

      reset()
      setMessage({message:'Message Sent Successfully',type:'success'})
     } catch (error) {
      console.error(error)
      setMessage({message:  'Something went wrong',type:'error'})
     }

    })
  }


  return (
    <div className='flex flex-col gap-16'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className="flex flex-col gap-1">
          <label className='text-slate-500'>Name</label>
          <input {...register('name')} type='text' placeholder='John Doe ' className='border-b focus:border-gray-400 outline-none w-full p-2 focus' />
          <InputError errors={errors} name='name' />
        </div>
        <div className="flex flex-col gap-1">
          <label className='text-slate-500'>Email</label>
          <input {...register('email')} type='email' placeholder='john.doe@example.com' className='border-b focus:border-gray-400 outline-none w-full p-2 focus' />
          <InputError errors={errors} name='email' />
        </div>

        <div className="flex flex-col gap-1">
          <label className='text-slate-500'>Message</label>
          <textarea {...register('message')} rows={5} placeholder='Write Your Message' className='border-b focus:border-gray-400 outline-none w-full p-2 focus' />
          <InputError errors={errors} name='message' />
        </div>
        <div className="flex flex-row justify-end">
          <button disabled={isPending} className='flex flex-row gap-2 disabled:text-gray-400'>
            <span>Send message</span> <span>{'->'}</span>
          </button>
        </div>
        <MessageTag {...message}></MessageTag>
      </form>
    </div>
  )
}
