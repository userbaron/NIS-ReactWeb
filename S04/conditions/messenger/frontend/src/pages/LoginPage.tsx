import { useState, type FormEvent } from 'react'
import { login } from '../api/authApi'
import { setToken } from '../helpers/authStorage'
import { handleError } from '../helpers/handleError'

export default function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [phone, setPhone] = useState('+79990000000')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login({ phone: phone.trim(), password })
      setToken(data.token)
      onLogin(data.token)
    } catch (error) {
      setError(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  return <section>
    <h2>Вход</h2>
    <form className="fields" onSubmit={handleSubmit}>
      <label>Телефон<input type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} required /></label>
      <label>Пароль<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      <button disabled={loading}>{loading ? 'Входим...' : 'Войти'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
  </section>
}
