import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { checkUser } from '@/lib/inngest/checkUser'
import { UserMenu } from './user-menu'

async function Header() {
  await checkUser()
  return (
    <header className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center p-4 border-b'>
      <nav>
        <Link href='/'>
          <img
            src="/logo.png?v=1"
            alt='PrepWise Logo'
            width={200}
            height={60}
            className='h-12 w-auto object-contain'
          />
        </Link>
      </nav>

      <div className='flex items-center space-x-2 md:space-x-4'>
        <UserMenu />
      </div>
    </header>
  )
}

export default Header
