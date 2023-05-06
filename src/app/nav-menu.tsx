import AuthCheck from '@/components/auth-check'
import { SignInButton, SignOutButton } from '@/components/buttons'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

import logo from 'public/logo.svg'

export default async function NavMenu() {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  })

  return (
    <nav className={`flex justify-between p-3 bg-blue-400`}>
      <Link href={'/'}>
        <Image
          src={logo} // Route of the image file
          width={216}
          height={30}
          alt='NextSpace Logo'
        />
      </Link>
      <ul className={`flex gap-2 items-center`}>
        <li>
          <Link href={'/users'}>Users</Link>
        </li>
        <li>
          <SignInButton />
        </li>
        <AuthCheck>
          <li>
            {user?.name} ({user?.age})
          </li>
          <li>
            <SignOutButton />
          </li>
        </AuthCheck>
      </ul>
    </nav>
  )
}
