import { createSlice } from "@reduxjs/toolkit";

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    product: null,
    error: null,
  },
  reducers: {
    productRequest(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
   productSuccess(state, action) {
  state.loading = false;
  state.product = action.payload;
  state.error = null;
},

    productFail(state, action) {
     
        state.loading= false;
       state. error=action.payload;
      
    },
  },
});

export const { productRequest, productSuccess, productFail } = singleProductSlice.actions;

export default singleProductSlice.reducer;
