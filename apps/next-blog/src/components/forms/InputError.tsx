import { ApiMessage } from '@/actions'
import React from 'react'
import { FieldErrors } from 'react-hook-form'
import tw from 'tailwind-styled-components'

type ErrorProps<T extends Record<string, string | undefined>> = {
    errors: FieldErrors<T>,
    name: keyof T
}

export const ErrorMessage = tw.p`text-red-500`
export const SuccessMessage = tw.p`text-green-500`

export const Space = ({space=true}:{space?:boolean})=> space? <div className="invisible">Placeholder</div> : null

export default function InputError<T  extends Record<string, string | undefined>>({errors, name}:ErrorProps<T>) {
  return errors?.[name]?.message ? <ErrorMessage>{errors?.[name]?.message as string}</ErrorMessage> : <Space/>
}

export const MessageTag = ({message, type, placeholder=true}:ApiMessage & {placeholder?:boolean}) => { 
    return message ? (type === 'error' ? <ErrorMessage>{message}</ErrorMessage> : <SuccessMessage>{message}</SuccessMessage>) : <Space/>
}




