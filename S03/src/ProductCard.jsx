export default function ProductCard({ product }) {
  return <article>
    <h2>{product.title}</h2>
    <p>{product.price} ₽</p>
    <p>{product.inStock ? 'В наличии' : 'Нет в наличии'}</p>
  </article>
}
