import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { light, dark } from './theme'
import { useTheme } from './useTheme'
import { Badge, Button, Card, GlobalStyle, Grid, Input } from './ui'
import type { Size, Variant } from './ui/Button'
import { categories, formatPrice, products } from './data'

const Page = styled.main`
  width: min(1280px, 100%);
  margin: auto;
  padding: 28px 20px;
  display: grid;
  gap: 28px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  h1 { font-size: 2rem; }
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`

const Filters = styled.section`
  display: grid;
  gap: 14px;
  label { display: grid; gap: 6px; max-width: 480px; }
`

const Picture = styled.div`
  display: grid;
  place-items: center;
  height: 130px;
  font-size: 3.5rem;
  background: ${({ theme }) => theme.colors.soft};
  border-radius: ${({ theme }) => theme.radius};
`

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  flex: 1;
`

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
`

const Empty = styled.section`
  text-align: center;
  padding: 48px 16px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  display: grid;
  justify-items: center;
  gap: 12px;
`

const Examples = styled.details`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 20px;
  summary { cursor: pointer; font-weight: 600; }
  > div { display: grid; gap: 12px; margin-top: 16px; }
`

const variants: Variant[] = ['primary', 'secondary', 'outline', 'danger']
const sizes: Size[] = ['sm', 'md', 'lg']

export default function App() {
  const { mode, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Все')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState<number[]>([])
  const visible = products.filter(product => product.title.toLowerCase().includes(query.trim().toLowerCase()) && (category === 'Все' || product.category === category))
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0)

  async function addToCart(id: number) {
    if (loading.includes(id)) return
    setLoading(items => [...items, id])
    await new Promise(resolve => setTimeout(resolve, 600))
    setCart(items => ({ ...items, [id]: (items[id] ?? 0) + 1 }))
    setLoading(items => items.filter(item => item !== id))
  }

  function resetFilters() {
    setQuery('')
    setCategory('Все')
  }

  return <ThemeProvider theme={mode === 'dark' ? dark : light}>
    <GlobalStyle />
    <Page>
      <Header>
        <div><h1>Мини-маркет</h1><Text>Техника и полезные вещи для дома</Text></div>
        <Button $variant="outline" onClick={toggleTheme}>{mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}</Button>
      </Header>

      <Row>
        <h2>Каталог</h2>
        <Badge role="status" aria-live="polite">Корзина: {count} шт. · {formatPrice(total)}</Badge>
        <Button $variant="danger" $size="sm" disabled={!count || loading.length > 0} onClick={() => setCart({})}>Очистить корзину</Button>
      </Row>

      <Filters aria-label="Фильтры каталога">
        <label>Поиск по названию<Input type="search" value={query} placeholder="Например, наушники" onChange={event => setQuery(event.target.value)} /></label>
        <Row role="group" aria-label="Категории">
          {categories.map(item => <Button key={item} $variant={item === category ? 'primary' : 'secondary'} $size="sm" aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</Button>)}
        </Row>
        <Text aria-live="polite">Найдено: {visible.length}</Text>
      </Filters>

      {visible.length ? <Grid aria-label="Товары">
        {visible.map(product => <Card key={product.id}>
          <Picture aria-hidden="true">{product.emoji}</Picture>
          <Row><Badge>{product.category}</Badge>{product.isNew && <Badge $new>Новинка</Badge>}</Row>
          <ProductTitle>{product.title}</ProductTitle>
          <Price>{formatPrice(product.price)}</Price>
          <Text>В корзине: {cart[product.id] ?? 0}</Text>
          <Button $loading={loading.includes(product.id)} onClick={() => addToCart(product.id)}>{loading.includes(product.id) ? 'Добавляем...' : 'В корзину'}</Button>
        </Card>)}
      </Grid> : <Empty>
        <h2>Ничего не найдено</h2>
        <Text>Попробуйте другое название или категорию.</Text>
        <Button $variant="secondary" onClick={resetFilters}>Сбросить фильтры</Button>
      </Empty>}

      <Examples>
        <summary>UI-кит: варианты кнопок</summary>
        <div>
          {variants.map(variant => <Row key={variant}>
            {sizes.map(size => <Button key={size} $variant={variant} $size={size}>{variant} · {size}</Button>)}
          </Row>)}
          <Row><Button disabled>Недоступно</Button><Button $loading>Загрузка...</Button></Row>
        </div>
      </Examples>
    </Page>
  </ThemeProvider>
}
