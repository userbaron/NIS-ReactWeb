import { useEffect, useRef } from 'react'

export default function SearchBar({ query, onSearch, onlyInStock, onStock }) {
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <div className="search">
    <input ref={inputRef} aria-label="Поиск по названию" placeholder="Поиск по названию…" value={query} onChange={onSearch} />
    <label><input type="checkbox" checked={onlyInStock} onChange={onStock} /> Только в наличии</label>
  </div>
}
