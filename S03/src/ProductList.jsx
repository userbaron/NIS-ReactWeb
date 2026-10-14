import ProductCard from './ProductCard'

export default function ProductList({ products, qtyById, onAdd, onRemove }) {
  return <div className="products">
    {products.map(p => <ProductCard key={p.id} product={p} qty={qtyById[p.id] ?? 0} onAdd={onAdd} onRemove={onRemove} />)}
  </div>
}
