import { combineReducers } from "redux";
import alertSice from "./alert/alertSice.js";
import cartReducer from "./cart/cartSlice.js";

export const rootReducer = combineReducers({
  alert: alertSice,
  cart: cartReducer
});