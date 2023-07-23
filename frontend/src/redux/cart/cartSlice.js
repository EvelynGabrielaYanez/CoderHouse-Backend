import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productList: [],
    cartId: null,
    userId: null
  },
  reducers: {
    setCartInfo: (state, { payload: { uid , cid, products } }) => {
      state.cartId = cid;
      state.userId = uid;
      state.productList = products;
    },
    setProductList: (state, { payload: { products } }) => {
      state.productList = products;
    },
    removeOneProduct: (state, { payload: { pid }}) => {
      const productData = state.productList.find(({ product }) => product._id === pid);
      if(!(productData.quantity -1)) state.productList.splice(state.productList.findIndex(({ product }) => product._id === pid), 1);
      else productData.quantity -= 1;
    }
  },
})

export const { setCartInfo, setProductList, removeOneProduct } = cartSlice.actions

export default cartSlice.reducer