import { createSlice } from '@reduxjs/toolkit';
import cookie from "js-cookie";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    id: null,
    name: null,
    cart: null,
    lastName: null,
    email: null
  },
  reducers: {
    logInUser: (state, { token, id, firstName, cartId, lastName, email, role }) => {
      cookie.set('jwt', token);
      state.token = token;
      state.id = id;
      state.firstName = firstName;
      state.cartId = cartId;
      state.lastName = lastName;
      state.email = email;
      state.role = role;
    },
    logOutUser: (state) => {
      state.token = null;
      state.id = null;
      state.firstName = null;
      state.cartId = null;
      state.lastName = null;
      state.email = null;
      state.role = null;
      cookie.remove('jwt');
    },
    getCurrentUser: async (state) => {
      return state;
    }
  }
});

export const { logInUser, logOutUser, getCurrentUser } = userSlice.actions;

export default userSlice.reducer;