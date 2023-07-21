import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    open: false,
    message: ''
  },
  reducers: {
    showAlert: (state, { payload: { message }}) => {
      state.open = true;
      state.message = message;
    },
    closeAlert: (state) => {
      state.message = '';
      state.open = false;
    }
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;