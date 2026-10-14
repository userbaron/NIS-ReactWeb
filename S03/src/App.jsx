import { useMemo, useState } from 'react'
import { products } from './data'
import Header from './Header'
import SearchBar from './SearchBar'
import ProductList from './ProductList'

export default function App() {
  const [query, setQuery] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(p => p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock))
  }, [query, onlyInStock])

  return <main>
    <Header />
    <SearchBar query={query} onSearch={e => setQuery(e.target.value)} onlyInStock={onlyInStock} onStock={e => setOnlyInStock(e.target.checked)} />
    <p>Найдено: {visible.length}</p>
    <ProductList products={visible} />
  </main>
}
