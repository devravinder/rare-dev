'use client'
import { LogIn, LogOut, Moon, Sun, UserRoundCog } from 'lucide-react'
import React, { useState } from 'react'
import LoginForm from './LoginForm'
import { SessionDetails } from '@/lib/auth'
import { logoutAction } from '@/actions/authActions'
import Modal from './Modal'

type UserSettingsProps = {
  session: SessionDetails | null
}
export default function UserSettings({ session }: UserSettingsProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [showForm, setShowForm] = useState(false)
  return (
    <div className='absolute right-2 group flex flex-row items-center justify-center'>
      <button ><UserRoundCog className='stroke-gray-800 stroke-[2.5px] ' width={17} /></button>
      <ul className='invisible group-focus-within:visible absolute top-full flex flex-col gap-2 p-2 border rounded-md bg-white shadow-lg'>
        <li className=''>
          {session ? <button onClick={logoutAction} ><LogOut width={17} /> </button> : <button onClick={() => setShowForm(!showForm)} ><LogIn width={17} /> </button>}
        </li>
        <li>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun width={17} /> : <Moon width={17} />}</button>
        </li>
      </ul>
      {showForm && <Modal><LoginForm onLoginSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} /></Modal>}
    </div>
  )
}
