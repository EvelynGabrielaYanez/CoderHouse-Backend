import { combineReducers } from "redux";
import alertSice from "./alert/alertSice.js";
import userReducer from './user/userSlice.js'
import cartReducer from "./cart/cartSlice.js";

export const rootReducer = combineReducers({
  alert: alertSice,
  currentUser: userReducer,
  cart: cartReducer
});