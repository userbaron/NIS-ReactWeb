import { useMemo, useState, useTransition } from 'react'
import { products } from './data'
import useCart from './useCart'
import Header from './Header'
import SearchBar from './SearchBar'
import ProductList from './ProductList'

export default function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [isPending, startTransition] = useTransition()
  const cart = useCart()
  const qtyById = useMemo(() => {
    const result = {}
    for (const item of cart.items) result[item.id] = item.qty
    return result
  }, [cart.items])

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase()
    return products.filter(p => p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock))
  }, [filter, onlyInStock])

  function handleSearch(e) {
    const value = e.target.value
    setQuery(value)
    startTransition(() => setFilter(value))
  }

  return <main>
    <Header totalCount={cart.totalCount} totalPrice={cart.totalPrice} onClear={cart.clear} />
    <SearchBar query={query} onSearch={handleSearch} onlyInStock={onlyInStock} onStock={e => setOnlyInStock(e.target.checked)} />
    <p>Найдено: {visible.length}</p>
    {isPending && <p role="status">Обновляем список…</p>}
    <ProductList products={visible} qtyById={qtyById} onAdd={cart.add} onRemove={cart.remove} />
  </main>
}
