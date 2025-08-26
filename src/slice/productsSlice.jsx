import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    productsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    productsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
    },
    productsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productsRequest, productsSuccess, productsFail } = productsSlice.actions;
export default productsSlice.reducer;
