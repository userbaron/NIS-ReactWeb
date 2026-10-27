import { useEffect, useState, type FormEvent } from 'react'
import type { User } from '../types'
import { getProfile, updateProfile } from '../api/userApi'
import ProfileCard from '../components/ProfileCard'
import { handleError } from '../helpers/handleError'

export default function ProfilePage({ token }: { token: string }) {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    getProfile(token).then(data => {
      if (!active) return
      setProfile(data)
      setNickname(data.nickname)
      setBio(data.bio)
    }).catch(error => {
      if (active) setError(handleError(error))
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [token])

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const data = await updateProfile(token, { nickname: nickname.trim(), bio })
      setProfile(data)
      setNickname(data.nickname)
      setSaved(true)
    } catch (error) {
      setError(handleError(error))
    } finally {
      setSaving(false)
    }
  }

  return <section>
    <h2>Профиль</h2>
    {loading && <p>Загрузка...</p>}
    {error && <p role="alert">{error}</p>}
    {profile && <>
      <ProfileCard profile={profile} />
      <form className="fields" onSubmit={handleSave}>
        <label>Никнейм<input value={nickname} onChange={e => { setNickname(e.target.value); setSaved(false) }} required /></label>
        <label>Описание<textarea aria-label="Описание" value={bio} onChange={e => { setBio(e.target.value); setSaved(false) }} /></label>
        <button disabled={saving || !nickname.trim()}>{saving ? 'Сохраняем...' : 'Сохранить'}</button>
      </form>
      {saved && <p role="status">Сохранено</p>}
    </>}
  </section>
}
