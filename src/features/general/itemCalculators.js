export const analyzeInventory = (items) => {
  const summarizedData = items.reduce(
    (acc, item) => {
      if (item.category === 'venison') {
        acc.venison_quantity += item.quantity
        acc.venison_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'chicken') {
        acc.chicken_quantity += item.quantity
        acc.chicken_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'fish') {
        acc.fish_quantity += item.quantity
        acc.fish_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'venison' || item.category === 'chicken' || item.category === 'fish') {
        acc.total_meat_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'kale') {
        acc.kale_quantity += item.quantity
        acc.kale_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'corn') {
        acc.corn_quantity += item.quantity
        acc.corn_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'beans') {
        acc.bean_quantity += item.quantity
        acc.bean_meals += item.quantity * item.mealsperquantity
      }
      if (item.category === 'beans' || item.category === 'corn' || item.category === 'kale' || item.category === 'other vegetable') {
        acc.total_veggie_meals += item.quantity * item.mealsperquantity
      }
      return acc
    },
    {
      venison_quantity: 0,
      venison_meals: 0,
      chicken_quantity: 0,
      chicken_meals: 0,
      fish_quantity: 0,
      fish_meals: 0,
      kale_quantity: 0,
      kale_meals: 0,
      bean_quantity: 0,
      bean_meals: 0,
      corn_quantity: 0,
      corn_meals: 0,
      total_meat_meals: 0,
      total_veggie_meals: 0,
    }
  )
  return summarizedData
}
