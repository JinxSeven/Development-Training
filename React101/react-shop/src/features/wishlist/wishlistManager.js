import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishlistedItems: []
}

const wishlistManager = createSlice({
  name: "wishlistManager",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = action.payload;
      const matchingItem = state.wishlistedItems.find(prod => prod.id === item.id);

      if (matchingItem) return;
      
      return {
        ...state,
        wishlistedItems: [...state.wishlistedItems, item]
      }
    }
  }
});

export const { addToWishlist } = wishlistManager.actions

export default wishlistManager.reducer