export const initialCart = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      if (!action.product.inStock) return state
      if (state.items.find(x => x.id === action.product.id)) {
        return { items: state.items.map(x => x.id === action.product.id ? { ...x, qty: x.qty + 1 } : x) }
      }
      return { items: [...state.items, { id: action.product.id, title: action.product.title, price: action.product.price, qty: 1 }] }
    case 'remove':
      return { items: state.items.filter(x => x.id !== action.id) }
    case 'clear':
      return initialCart
    default:
      return state
  }
}
