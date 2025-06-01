import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartCount: 0,
  cartItems: []
}

const cartSlice = createSlice({
  name: "cartManager",
  initialState,
  reducers: {
    addToCart(state, action) {
      const prod = action.payload;
      const existingItem = state.cartItems.find(prd => prd.id === prod.id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(prd => prd.id === prod.id ? {...prd, quantity: prd.quantity + 1 } : prd)
        }
      } else {
        return {
          ...state,
          cartCount: state.cartCount + 1,
          cartItems: [...state.cartItems, { ...prod, quantity: 1 }]
        }
      }
    }
  }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;