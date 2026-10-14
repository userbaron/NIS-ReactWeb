import ProductCard from './ProductCard'

export default function ProductList({ products, cart, onAdd, onRemove }) {
  return <div className="products">
    {products.map(p => <ProductCard key={p.id} product={p} qty={cart.items.find(x => x.id === p.id)?.qty || 0} onAdd={onAdd} onRemove={onRemove} />)}
  </div>
}
