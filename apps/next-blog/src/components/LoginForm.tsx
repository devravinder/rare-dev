"use client"
import { ApiMessage } from '@/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import InputError, { MessageTag } from './forms/InputError';
import { loginAction } from '@/actions/authActions';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});


export type LoginInputs = z.infer<typeof schema>;


type LoginFormProps = {
    onCancel: () => void
    onLoginSuccess: () => void
}
export default function LoginForm({onCancel, onLoginSuccess}:LoginFormProps) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginInputs>({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    });

    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<ApiMessage>({})


    const onSubmit: SubmitHandler<LoginInputs> = payload => {
        setMessage({})
        startTransition(async () => {
            try {
                const res = await loginAction(payload)
                if (res.type === 'success') {
                    onLoginSuccess()
                } else {
                    setMessage(res)
                }
            } catch (error) {
                console.error(error)
                setMessage({ message: 'Something went wrong', type: 'error' })
            }

        })
    }

    watch(() => setMessage({}))

    return (
        <div className="flex flex-col gap-2 p-4 rounded-md text-black bg-white shadow-lg border w-96">
            <h2 className='text-2xl font-semibold text-center'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <div className="flex flex-col">
                    <label htmlFor="email" className='text-slate-500' >Email</label>
                    <input {...register('email')} type="email" name="email" placeholder="Email" className='border-b focus:border-gray-400 outline-none p-2' />
                    <InputError errors={errors} name='email' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className='text-slate-500'>Password</label>
                    <input {...register('password')} type="password" name="password" placeholder="Password" className='border-b focus:border-gray-400 outline-none p-2' />
                    <InputError errors={errors} name='password' />
                </div>
                <div className="flex flex-row justify-between">
                    <button onClick={onCancel} type='button' disabled={isPending} className='flex flex-row gap-2 disabled:text-gray-400'>
                    <span>Cancel</span> 
                    </button>
                    <button disabled={isPending} className='flex flex-row gap-2 disabled:text-gray-400'>
                        <span>Login</span> <span>{'->'}</span>
                    </button>
                </div>
                <MessageTag {...message} />
            </form>
        </div>
    )
}
