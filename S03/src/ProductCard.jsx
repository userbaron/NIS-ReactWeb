import { memo } from 'react'

export default memo(function ProductCard({ product, qty, onAdd, onRemove }) {
  console.log('render', product.id)
  return <article>
    <h2>{product.title}</h2>
    <p>{product.price} ₽</p>
    <p>{product.inStock ? 'В наличии' : 'Нет в наличии'}</p>
    <button disabled={!product.inStock} onClick={() => onAdd(product)}>В корзину</button>
    {qty > 0 && <div><p>В корзине: {qty}</p><button onClick={() => onRemove(product.id)}>Убрать</button></div>}
  </article>
})
