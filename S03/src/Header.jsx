export default function Header({ totalCount, totalPrice, onClear }) {
  return <header>
    <h1>Магазин</h1>
    <div><p>Корзина: {totalCount} шт. · {totalPrice} ₽</p><button onClick={onClear}>Очистить</button></div>
  </header>
}
