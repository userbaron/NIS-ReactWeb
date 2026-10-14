import { useCallback, useMemo, useReducer, useState } from 'react'
import { products } from './data'
import { cartReducer, initialCart } from './cartReducer'
import Header from './Header'
import SearchBar from './SearchBar'
import ProductList from './ProductList'

export default function App() {
  const [query, setQuery] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const totalCount = cart.items.reduce((sum, x) => sum + x.qty, 0)
  const totalPrice = cart.items.reduce((sum, x) => sum + x.price * x.qty, 0)
  const onAdd = useCallback(product => dispatch({ type: 'add', product }), [])
  const onRemove = useCallback(id => dispatch({ type: 'remove', id }), [])
  const onClear = useCallback(() => dispatch({ type: 'clear' }), [])
  const qtyById = useMemo(() => {
    const result = {}
    for (const item of cart.items) result[item.id] = item.qty
    return result
  }, [cart.items])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(p => p.title.toLowerCase().includes(q) && (!onlyInStock || p.inStock))
  }, [query, onlyInStock])

  return <main>
    <Header totalCount={totalCount} totalPrice={totalPrice} onClear={onClear} />
    <SearchBar query={query} onSearch={e => setQuery(e.target.value)} onlyInStock={onlyInStock} onStock={e => setOnlyInStock(e.target.checked)} />
    <p>Найдено: {visible.length}</p>
    <ProductList products={visible} qtyById={qtyById} onAdd={onAdd} onRemove={onRemove} />
  </main>
}
