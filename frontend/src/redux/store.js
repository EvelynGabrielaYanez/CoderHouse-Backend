import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './alert/alertSice.js';
import userReducer from './user/userSlice.js'
import cartReducer from "./cart/cartSlice.js";

export default configureStore({
  reducer: {
    alert: alertReducer,
    currentUser: userReducer,
    cart: cartReducer
  },
})