import { prisma } from '@/lib/prisma'
import React from 'react'
import UserCard from './user-card'

export default async function Page() {
  const users = await prisma.user.findMany()
  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          age={user.age}
          image={user.image}
        />
      ))}
    </div>
  )
}
