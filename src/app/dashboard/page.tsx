import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from './profile-form'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  const currentUserEmail = session.user?.email!
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return (
    <>
      <h1>Dash board</h1>
      <ProfileForm user={user} />
    </>
  )
}
