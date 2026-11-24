import { useEffect, useState } from 'react'
import type { ThemeName } from './theme'

const key = 'mini-market-theme'

function readPreference(): ThemeName | null {
  try {
    const saved = localStorage.getItem(key)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return null
}

export function useTheme() {
  const [preference, setPreference] = useState(readPreference)
  const [system, setSystem] = useState<ThemeName>(() => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const mode = preference ?? system

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystem(media.matches ? 'dark' : 'light')
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  useEffect(() => {
    if (!preference) return
    try {
      localStorage.setItem(key, preference)
    } catch {}
  }, [preference])

  return { mode, toggleTheme: () => setPreference(mode === 'light' ? 'dark' : 'light') }
}
