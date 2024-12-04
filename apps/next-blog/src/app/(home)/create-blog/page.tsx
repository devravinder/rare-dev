import Devider from '@/components/Devider'
import Editor from '@/components/Editor'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-16'>
      <Devider/>
      <Editor/>
    </div>
  )
}
