"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="bg-green-500 disabled:bg-green-400 min-w-24 px-4 py-2 rounded-md">{`${pending ? 'Wait...' : 'Create'}`}</button>
    );
}
