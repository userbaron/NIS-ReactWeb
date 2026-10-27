import type { User } from '../types'

export default function ProfileCard({ profile }: { profile: User }) {
  return <div className="profile">
    <p>Никнейм: {profile.nickname}</p>
    <p>Телефон: {profile.phone}</p>
    <p>Описание: {profile.bio}</p>
  </div>
}
