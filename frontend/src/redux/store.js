import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './alert/alertSice.js';
import cartReducer from "./cart/cartSlice.js";

export default configureStore({
  reducer: {
    alert: alertReducer,
    cart: cartReducer
  },
})