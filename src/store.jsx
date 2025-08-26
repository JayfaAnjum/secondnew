import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice';
import productReducer from './slice/singleproductSlice';

import authReducer from './slice/authSlice';

const rootReducer = combineReducers({
  productsState: productsReducer,
  productState:productReducer,
  authState:authReducer
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
