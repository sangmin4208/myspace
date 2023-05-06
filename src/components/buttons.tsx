'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function SignInButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>...</>
  }

  if (status === 'authenticated') {
    return (
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image ?? '/mememan.webp'}
          width={32}
          height={32}
          alt='Your Name'
        />
      </Link>
    )
  }
  return (
    <button
      onClick={() => signIn()}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
    >
      Sign In
    </button>
  )
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
    >
      Sign Out
    </button>
  )
}
