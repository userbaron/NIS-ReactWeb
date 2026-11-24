export const products = [
  { id: 1, title: 'Беспроводные наушники', price: 7990, category: 'Электроника', emoji: '🎧', isNew: true },
  { id: 2, title: 'Механическая клавиатура', price: 11490, category: 'Электроника', emoji: '⌨️', isNew: false },
  { id: 3, title: 'Настольная лампа', price: 2590, category: 'Для дома', emoji: '💡', isNew: true },
  { id: 4, title: 'Рюкзак', price: 3490, category: 'Аксессуары', emoji: '🎒', isNew: false },
  { id: 5, title: 'Умные часы', price: 6990, category: 'Электроника', emoji: '⌚', isNew: true },
  { id: 6, title: 'Керамическая кружка', price: 790, category: 'Для дома', emoji: '☕', isNew: false },
  { id: 7, title: 'Солнцезащитные очки', price: 1990, category: 'Аксессуары', emoji: '🕶️', isNew: false },
  { id: 8, title: 'Комнатное растение', price: 1290, category: 'Для дома', emoji: '🪴', isNew: true },
]

export const categories = ['Все', 'Электроника', 'Для дома', 'Аксессуары']
export const formatPrice = (price: number) => price.toLocaleString('ru-RU') + ' ₽'
