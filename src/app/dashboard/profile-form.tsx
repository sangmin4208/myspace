'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface UpdateUser {
  name: string
  bio: string
  age: number
  image: string
}

const updateUser = async (updateUser: UpdateUser) => {
  const res = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(updateUser),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  await res.json()
}

export function ProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsFetching(true)
    const body = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      age: Number(formData.get('age')),
      image: formData.get('image'),
    } as UpdateUser
    await updateUser(body)
    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  if (isPending || isFetching) return <p>Updating...</p>

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form
        className='flex flex-col max-w-md gap-2 p-2 text-gray-900'
        onSubmit={handleSubmit}
      >
        <label className='text-white' htmlFor='name'>
          Name
        </label>
        <input type='text' name='name' defaultValue={user?.name ?? ''} />
        <label htmlFor='bio'>Bio</label>
        <textarea
          name='bio'
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ''}
        ></textarea>
        <label className='text-white' htmlFor='age'>
          Age
        </label>
        <input type='text' name='age' defaultValue={user?.age ?? 0} />
        <label className='text-white' htmlFor='image'>
          Profile Image URL
        </label>
        <input type='text' name='image' defaultValue={user?.image ?? ''} />

        <button
          className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  )
}
