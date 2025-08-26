
import { productsFail, productsRequest, productsSuccess } from '../slice/productsSlice';


export const fetchProducts =(query,page=1,per_page=8) =>async (dispatch)=>{

try{
dispatch(productsRequest())
const res=await fetch(
    `${import.meta.env.VITE_REACT_APP_URL}/product/search?q=${query}&page=${page}&per_page=${per_page}`
    
)

const data=await res.json();
  dispatch(productsSuccess({ products: data.products, totalPages: data.totalPages }));

}catch(error){

dispatch(productsFail(error.message))
}

}