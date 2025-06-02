import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartManager'

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

export default store;
