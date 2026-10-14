import { useCallback, useMemo, useReducer } from 'react'
import { cartReducer, initialCart } from './cartReducer'

export default function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const add = useCallback(product => dispatch({ type: 'add', product }), [])
  const remove = useCallback(id => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const totalCount = useMemo(() => cart.items.reduce((sum, x) => sum + x.qty, 0), [cart.items])
  const totalPrice = useMemo(() => cart.items.reduce((sum, x) => sum + x.price * x.qty, 0), [cart.items])
  return { ...cart, totalCount, totalPrice, add, remove, clear }
}
