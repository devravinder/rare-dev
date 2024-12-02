import Link from 'next/link'
import UserSettings from './UserSettings'
import { getSession } from '@/lib/auth'

export default async function Navigation() {

  const session = await getSession()

  return <nav className='relative w-full flex flex-row justify-center items-center'>
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
      {session && <li>
        <Link href="/create-blog">Create Blog</Link>
      </li>}

    </ul>
    <UserSettings session={session} />
  </nav>
}
