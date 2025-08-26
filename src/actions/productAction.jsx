import { productFail, productRequest, productSuccess } from '../slice/singleproductSlice';

export const getsingleproduct = id=> async (dispatch) => {
  console.log("getsingleproduct action called with id:", id);

  try {
    dispatch(productRequest());

    const res = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/product/${id}`);

    const data = await res.json();

    console.log(data); 

    dispatch(productSuccess(data));

  } catch (error) {
    dispatch(productFail(error.message));
  }
};
