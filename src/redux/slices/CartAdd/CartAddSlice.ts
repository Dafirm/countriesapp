import { createSlice } from '@reduxjs/toolkit'

import { AddToCartAction, Cart, RemoveFromCartAction } from '../../../types'

type CartState = {
  items: Cart[]
}
const initialState: CartState = {
  items: [],
}
export const CartAdd = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action: AddToCartAction) => {
      const { name, flags } = action.payload
      const country = { name, flags }

      const isDuplicate = state.items.some((item) => item.name === country.name)
      if (isDuplicate) return

      state.items = [...state.items, country]
    },
    removeFromCart: (state, action: RemoveFromCartAction) => {
      const filteredItems = state.items.filter(
        (item) => item.name !== action.payload.name
      )
      state.items = filteredItems
    },
  },
})

export const { addToCart, removeFromCart } = CartAdd.actions
export default CartAdd.reducer
