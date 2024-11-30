import Link from 'next/link'
import React from 'react'

export default function Navigation() {
  return <nav className='self-center'>
    <ul className='flex flex-row gap-10 font-medium text-lg'>
        <li>
            <Link href="/">Articles</Link>
        </li>
        <li>
            <Link href="/about">About</Link>
        </li>
        <li>
            <Link href="/contact">Contact Me</Link>
        </li>
     
    </ul>
  </nav>
}
