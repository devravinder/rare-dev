import React from 'react'
import { about } from '@/lib/data'
export default function About() {
  return (
    <div>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl" dangerouslySetInnerHTML={{__html: about}}></div>
    </div>
  )
}
