import FollowButton from '@/components/follow-button'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  return { title: `User profile of ${user?.name}` }
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  if (!user) throw new Error('User not found')
  const { name, bio, image, id, age } = user

  return (
    <div>
      <h1>
        {name} ({age})
      </h1>

      <img
        width={300}
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>

      {/* @ts-expect-error Server Component */}
      <FollowButton targetUserId={id} />
    </div>
  )
}
